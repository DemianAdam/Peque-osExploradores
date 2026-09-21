---
name: convex-triggers
description: Use when writing or updating database triggers, relational integrity checks, cascading deletes, or automated side effects in Convex backend modules using convex-helpers and subscribeTrigger.
---

# Convex Database Triggers Skill

This skill governs the implementation of reactive database triggers, relational integrity enforcement, and cascading cleanups across backend domains in **Pequeños Exploradores**.

## 1. Central Trigger Infrastructure (`convex/triggers.ts`)

The project uses `convex-helpers/server/triggers` to manage database triggers. 
- `triggersDB` wraps `ctx.db` in custom mutations so that all database writes are intercepted.
- `subscribeTrigger` provides a strongly typed helper to listen to `insert`, `update`, and `delete` operations on any table.

### Implementation Reference (`convex/triggers.ts`):
```ts
import { Change, Triggers } from "convex-helpers/server/triggers";
import { DataModel, TableNames } from "./_generated/dataModel";

const triggers = new Triggers<DataModel>();

export const triggersDB = triggers.wrapDB;
```

## 2. Domain Trigger Implementation (`convex/{domain}/triggers.ts`)

When creating triggers for a domain, create a `triggers.ts` file in the domain folder and import `subscribeTrigger` from `../triggers`.

### Example: Relational Integrity & Cascading Deletes (`convex/groups/triggers.ts`):
```ts
import { subscribeTrigger } from "../triggers";

subscribeTrigger("groups", {
    delete: async (ctx, { oldDoc }) => {
        // 1. Guard check: prevent deletion if active dependencies exist
        const anyActiveChildrenInGroup = await ctx.db.query("children")
            .withIndex("index_group_active", (q) =>
                q.eq("groupId", oldDoc._id).eq("active", true))
            .unique();

        if (anyActiveChildrenInGroup) {
            throw new Error(`Cannot delete group with id ${oldDoc._id} because it has associated children.`);
        }

        // 2. Cascading cleanup: delete related records in join tables
        const groupTeachersQuery = ctx.db.query("group_teachers")
            .withIndex("index_group", (q) => q.eq("groupId", oldDoc._id));

        for await (const groupTeacher of groupTeachersQuery) {
            await ctx.db.delete("group_teachers", groupTeacher._id);
        }
    }
});
```

## 3. Best Practices for Triggers
- **Guard Checks on Delete:** Always verify that parent records do not have active child documents or dependencies before allowing deletion.
- **Cascading cleanups:** Clean up associated join table records (e.g. many-to-many relationship tables like `group_teachers`) during delete operations.
- **Custom Mutation Integration:** Ensure mutations that should fire triggers are wrapped with `customMutation(rawMutation, customCtx(triggersDB))`.
