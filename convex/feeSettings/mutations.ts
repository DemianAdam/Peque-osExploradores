import { zTeacherMutation } from "../zod";
import { MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { FeeSettingsData } from "./types";
import { updateFeeSettingsValidator, feeSettingsValidator } from "./validators";
import { zid } from "convex-helpers/server/zod4";

async function getOrCreateFeeSettings(ctx: MutationCtx): Promise<Id<"feeSettings">> {
    const existing = await ctx.db.query("feeSettings").first();
    if (existing) return existing._id;

    return await ctx.db.insert("feeSettings", {
        feeAmount: 0,
        partnerPercentage: 0,
        updatedAt: Date.now(),
        updatedBy: ctx.teacher._id,
    } as FeeSettingsData);
}

async function updateCurrentPeriodFees(ctx: MutationCtx, newFeeAmount: number) {
    const currentPayslip = await ctx.db.query("payslips")
        .filter(q => q.eq(q.field("closedAt"), null))
        .first();

    if (!currentPayslip) return;

    const fees = await ctx.db.query("fees")
        .withIndex("index_startedAt", q => q.eq("startedAt", currentPayslip.startedAt))
        .collect();

    for (const fee of fees) {
        if (fee.closedAt === null) {
            await ctx.db.patch("fees", fee._id, { totalAmount: newFeeAmount });
        }
    }
}

export const updateFeeSettings = zTeacherMutation({
    args: updateFeeSettingsValidator,
    handler: async (ctx, args) => {
        const settingsId = await getOrCreateFeeSettings(ctx);

        const updateData: Partial<FeeSettingsData> = {
            updatedAt: Date.now(),
            updatedBy: ctx.teacher._id,
        };

        if (args.feeAmount !== undefined) {
            updateData.feeAmount = args.feeAmount;
            await updateCurrentPeriodFees(ctx, args.feeAmount);
        }
        if (args.partnerPercentage !== undefined) {
            updateData.partnerPercentage = args.partnerPercentage;
        }

        await ctx.db.patch("feeSettings", settingsId, updateData);

        return await ctx.db.get("feeSettings", settingsId);
    }
});

export const createFeeSettings = zTeacherMutation({
    args: feeSettingsValidator.omit({ updatedAt: true, updatedBy: true }),
    handler: async (ctx, args) => {
        const existing = await ctx.db.query("feeSettings").first();
        if (existing) {
            throw new Error("Fee settings already exist. Use updateFeeSettings instead.");
        }

        const settingsId = await ctx.db.insert("feeSettings", {
            ...args,
            updatedAt: Date.now(),
            updatedBy: ctx.teacher._id,
        } as FeeSettingsData);

        return await ctx.db.get("feeSettings", settingsId);
    }
});