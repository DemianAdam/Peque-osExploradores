import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { teacherValidator } from "./validators";

const schema = zodOutputToConvex(teacherValidator);

export const teacherSchema = defineTable(schema)
    .index("index_name", ["name"])
    .index("index_user", ["userId"])