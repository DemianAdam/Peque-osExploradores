import { ConvexError } from "convex/values";
import { MutationCtx, QueryCtx } from "../_generated/server";
import { getCurrentUser } from "../users/functions";
import { Teacher } from "./types";

export async function getCurrentTeacher(ctx: QueryCtx | MutationCtx): Promise<Teacher> {
    const user = await getCurrentUser(ctx);

    const teacher = await ctx.db.query("teachers")
        .withIndex("index_user", (q) => q.eq("userId", user._id))
        .unique();

    if (!teacher) {
        throw new ConvexError("Teacher not found")
    }

    return teacher;
}