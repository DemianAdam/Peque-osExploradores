---
name: zod-convex-validation
description: Use when defining backend validators, schemas, or query/mutation functions in convex/ using Zod v4, zid table references, and zodOutputToConvex conversions.
---

# Zod v4 & Convex Validation Skill

This skill governs runtime validation, schema bridging, and typed function wrappers across the Convex backend in **Pequeños Exploradores**.

## 1. Domain Validators (`validators.ts`)

Every backend domain must define its core data validation schema using Zod v4 (`import z from "zod"`). 
For relational document ID references to other Convex tables, always use `zid` from `convex-helpers/server/zod4`.

### Example (`convex/teachers/validators.ts`):
```ts
import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const teacherValidator = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    userId: zid("users"),
});
```

## 2. Table Schema Conversion (`schema.ts`)

Convex tables are defined by converting Zod output schemas into Convex database validators using `zodOutputToConvex` from `convex-helpers/server/zod`.

### Example (`convex/teachers/schema.ts`):
```ts
import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { teacherValidator } from "./validators";

const schema = zodOutputToConvex(teacherValidator);

export const teacherSchema = defineTable(schema)
  .index("index_name", ["name"])
  .index("index_user", ["userId"]);
```

## 3. Validated Convex Functions (`convex/zod.ts`)

Instead of raw Convex queries and mutations, use the custom helper wrappers defined in `convex/zod.ts` when runtime argument validation or context injection (such as authenticated teacher context) is required.

### Available Wrappers (`convex/zod.ts`):
- `zQuery`: Validates query arguments using Zod.
- `zInternalQuery`: For internal queries.
- `zTeacherQuery`: Injects authenticated teacher context (`ctx.teacher`) into queries.
- `zTeacherMutation`: Injects authenticated teacher context and triggers DB into mutations.

### Example Usage in Queries/Mutations:
```ts
import { zQuery } from "../zod";
import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const getTeacherById = zQuery({
    args: {
        teacherId: zid("teachers"),
    },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.teacherId);
    },
});
```
