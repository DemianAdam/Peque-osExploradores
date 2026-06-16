import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
import { userSchema } from "./users/schema";

export default defineSchema({
  ...authTables,
  users: userSchema
});
