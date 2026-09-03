import { MutationCtx, QueryCtx } from "../_generated/server";
import { FeeSettings } from "./types";

export async function getCurrentFeeSettings(ctx: MutationCtx | QueryCtx): Promise<FeeSettings> {
    const feeSettings = await ctx.db.query("feeSettings").first();
    if (!feeSettings) {
        throw new Error("Fee settings not found. Please configure fee settings before.");
    }
    return feeSettings;
}