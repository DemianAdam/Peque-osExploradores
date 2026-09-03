import { MutationCtx } from "../_generated/server";
import { Child } from "./types";

export async function getActiveChildren(ctx: MutationCtx): Promise<Child[]> {
    return await ctx.db.query("children")
        .withIndex("index_active", q => q.eq("active", true))
        .collect();
}