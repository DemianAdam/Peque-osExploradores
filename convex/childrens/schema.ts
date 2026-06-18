import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { childrenValidator } from "./validators";

const schema = zodOutputToConvex(childrenValidator);

export const childrenSchema = defineTable(schema)
    .index("index_name_active", ["name","active"])
    .index("index_group_active",["groupId","active"])