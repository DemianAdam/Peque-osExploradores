import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { feeValidator } from "./validators";

const schema = zodOutputToConvex(feeValidator);

export const feeSchema = defineTable(schema)
    .index("index_state", ["state"])
    .index("index_children",["childrenId"])
    .index("index_children_state",["childrenId","state"])