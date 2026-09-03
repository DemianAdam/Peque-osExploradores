import { zTeacherMutation } from "../zod";
import { closePayslipValidator, createFirstPayslipValidator, deleteLastPayslipValidator } from "./validators";
import { getCurrentOpenPayslip } from "./functions";
import { recomputeFeeState } from "../payments/functions";
import { createCurrentFees } from "../fees/functions";
import { PayslipData } from ".";

export const closePayslip = zTeacherMutation({
    args: closePayslipValidator,
    handler: async (ctx, args) => {
        const currentPayslip = await getCurrentOpenPayslip(ctx);
        if (!currentPayslip) {
            throw new Error("No open payslip found to close");
        }
        const feeSettings = await ctx.db.query("feeSettings").first();

        if (!feeSettings) {
            throw new Error("Fee settings not found. Please configure fee settings before closing the payslip.");
        }

        const now = Date.now();

        const updatedPayslip: PayslipData = {
            startedAt: currentPayslip.startedAt,
            closedAt: now,
            totalCollected: currentPayslip.totalCollected,
            totalSpent: currentPayslip.totalSpent,
            partnerPercentage: args.partnerPercentage,
            feeAmountUsed: feeSettings.feeAmount,
            closedByTeacher: ctx.teacher._id,
        }

        await ctx.db.patch("payslips", currentPayslip._id, updatedPayslip)

        await ctx.db.insert("payslips", {
            startedAt: now,
            closedAt: null,
            totalCollected: 0,
            totalSpent: 0,
            partnerPercentage: args.partnerPercentage,
            feeAmountUsed: feeSettings.feeAmount,
            closedByTeacher: null,
        });

        await createCurrentFees(ctx, feeSettings.feeAmount);
    }
});

export const deleteLastPayslip = zTeacherMutation({
    args: deleteLastPayslipValidator,
    handler: async (ctx) => {
        const payslips = await ctx.db.query("payslips")
            .order("desc")
            .collect();
        const currentPayslip = await getCurrentOpenPayslip(ctx);

        if (payslips.length == 1 || !currentPayslip) {
            throw new Error("Cannot delete the only payslip or no previous payslip exists");
        }

        const invoicesToDelete = await ctx.db.query("invoices")
            .withIndex("index_payslip", q => q.eq("payslipId", currentPayslip._id))
            .collect();

        for (const invoice of invoicesToDelete) {
            await ctx.db.delete("invoices", invoice._id);
        }

        const feesToDelete = await ctx.db.query("fees")
            .withIndex("index_payslip", q => q.eq("payslipId", currentPayslip._id))
            .collect();
        const feeIdsToDelete = new Set(
            feesToDelete.map(fee => fee._id)
        );

        for (const feeId of feeIdsToDelete) {
            const feePayments = await ctx.db.query("payments")
                .withIndex("index_fee", q => q.eq("feeId", feeId))
                .collect();

            for (const payment of feePayments) {
                await ctx.db.delete("payments", payment._id);
            }

            await ctx.db.delete("fees", feeId);
        }

        const paymentsToDelete = await ctx.db.query("payments")
            .withIndex("index_payslip", q => q.eq("payslipId", currentPayslip._id))
            .collect();

        for (const payment of paymentsToDelete) {
            await ctx.db.delete("payments", payment._id)
        }

        // Recompute only fees that still exist (not deleted above)
        const feeIdsToRecompute = [
            ...new Set(
                paymentsToDelete
                    .map(payment => payment.feeId)
                    .filter(feeId => !feeIdsToDelete.has(feeId))
            )
        ];

        for (const feeId of feeIdsToRecompute) {
            await recomputeFeeState(ctx, feeId)
        }

        const previousPayslip = payslips[1];

        await ctx.db.patch("payslips", previousPayslip._id, { closedAt: null, closedByTeacher: null });
    }
});

export const createFirstPayslip = zTeacherMutation({
    args: createFirstPayslipValidator,
    handler: async (ctx, args): Promise<void> => {
        const existingPayslip = await ctx.db.query("payslips").first();
        if (existingPayslip) {
            throw new Error("A payslip already exists. Cannot create the first payslip.");
        }

        const now = Date.now();

        const existingFeeSettings = await ctx.db.query("feeSettings").first();
        if (existingFeeSettings) {
            await ctx.db.patch("feeSettings", existingFeeSettings._id, {
                feeAmount: args.feeAmountUsed,
                partnerPercentage: args.partnerPercentage,
                updatedAt: now,
                updatedBy: ctx.teacher._id,
            });
        } else {
            await ctx.db.insert("feeSettings", {
                feeAmount: args.feeAmountUsed,
                partnerPercentage: args.partnerPercentage,
                updatedAt: now,
                updatedBy: ctx.teacher._id,
            });
        }


        const payslipId = await ctx.db.insert("payslips", {
            startedAt: now,
            closedAt: null,
            totalCollected: 0,
            totalSpent: 0,
            partnerPercentage: args.partnerPercentage,
            feeAmountUsed: args.feeAmountUsed,
            closedByTeacher: null,
        });

        const invoicesWithoutPayslip = await ctx.db.query("invoices")
            .withIndex("index_payslip", q => q.eq("payslipId", null))
            .collect();

        for (const invoice of invoicesWithoutPayslip) {
            await ctx.db.patch("invoices", invoice._id, { payslipId: payslipId });
        }

        await createCurrentFees(ctx, args.feeAmountUsed);
    }
});