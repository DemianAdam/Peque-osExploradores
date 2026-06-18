import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { userValidator } from "./validators";

const schema = zodOutputToConvex(userValidator);
export const userSchema = defineTable(schema)
    .index("index_user", ["user"]);