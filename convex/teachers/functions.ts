import { ConvexError } from "convex/values";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { getCurrentUser } from "../users/functions";
import { Teacher } from "./types";

export async function getCurrentTeacher(ctx: QueryCtx | MutationCtx): Promise<Teacher | null> {
    const user = await getCurrentUser(ctx);

    const teacher = await ctx.db.query("teachers")
        .withIndex("index_user", (q) => q.eq("userId", user._id))
        .unique();

    return teacher;
}