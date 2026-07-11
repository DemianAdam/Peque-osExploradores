import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { childValidator } from "./validators";

const schema = zodOutputToConvex(childValidator);

export const childrenSchema = defineTable(schema)
    .index("index_dni", ["dni"])
    .index("index_name_active", ["name", "active"])
    .index("index_group_active", ["groupId", "active"])