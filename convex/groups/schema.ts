import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { groupValidator } from "./validators";

const schema = zodOutputToConvex(groupValidator);

export const groupSchema = defineTable(schema)
    .index("index_name", ["name"])