import { zTeacherMutation } from "../zod";
import { MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { updateFeeSettingsValidator, feeSettingsValidator } from "./validators";

async function getOrCreateFeeSettings(ctx: MutationCtx, teacherId: Id<"teachers">): Promise<Id<"feeSettings">> {
    const existing = await ctx.db.query("feeSettings").first();
    if (existing) return existing._id;

    return await ctx.db.insert("feeSettings", {
        feeAmount: 0,
        partnerPercentage: 0,
        updatedAt: Date.now(),
        updatedBy: teacherId,
    });
}

async function updateCurrentPeriodFees(ctx: MutationCtx, newFeeAmount: number) {
    const currentPayslip = await ctx.db.query("payslips")
        .withIndex("index_closedAt", q => q.eq("closedAt", null))
        .first();

    if (!currentPayslip) return;

    const fees = await ctx.db.query("fees")
        .withIndex("index_payslip", q => q.eq("payslipId", currentPayslip._id))
        .collect();

    for (const fee of fees) {
        await ctx.db.patch("fees", fee._id, { totalAmount: newFeeAmount });
    }

    await ctx.db.patch("payslips", currentPayslip._id, { feeAmountUsed: newFeeAmount });
}

export const updateFeeSettings = zTeacherMutation({
    args: updateFeeSettingsValidator,
    handler: async (ctx, args) => {
        const settingsId = await getOrCreateFeeSettings(ctx, ctx.teacher._id);
        const settings = await ctx.db.get("feeSettings", settingsId);

        let feeAmount = settings?.feeAmount;
        let partnerPercentage = settings?.partnerPercentage;

        if (args.feeAmount !== undefined) {
            feeAmount = args.feeAmount;
            await updateCurrentPeriodFees(ctx, args.feeAmount);
        }

        if (args.partnerPercentage !== undefined) {
            partnerPercentage = args.partnerPercentage;
        }

        const updateData = {
            updatedAt: Date.now(),
            updatedBy: ctx.teacher._id,
            feeAmount: feeAmount,
            partnerPercentage: partnerPercentage
        };

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

        const date = Date.now();
        const settingsId = await ctx.db.insert("feeSettings", {
            ...args,
            updatedAt: date,
            updatedBy: ctx.teacher._id,
        });

        return await ctx.db.get("feeSettings", settingsId);
    }
});