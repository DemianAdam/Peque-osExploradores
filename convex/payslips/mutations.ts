import { zTeacherMutation } from "../zod";
import { MutationCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { Payslip, FullPayslip } from "./types";
import { FeeData } from "../fees/types";
import { PaymentData } from "../payments/types";
import { InvoiceData } from "../invoices/types";
import { Child } from "../children/types";
import z from "zod";
import { feeSettingsValidator } from "../feeSettings/validators";

const closePayslipValidator = z.object({
    partnerPercentage: z.number().min(0).max(100),
    feeAmount: z.number().min(0),
});

const deleteLastPayslipValidator = z.object({});

async function getActiveChildren(ctx: MutationCtx): Promise<Child[]> {
    return await ctx.db.query("children")
        .withIndex("index_group_active", q => q.eq("active", true))
        .collect();
}

async function getCurrentOpenPayslip(ctx: MutationCtx): Promise<Payslip | null> {
    return await ctx.db.query("payslips")
        .withIndex("index_teacher", q => q.eq("teacherId", ctx.teacher._id))
        .filter(q => q.eq(q.field("closedAt"), null))
        .first();
}

async function getPaymentsInPeriod(ctx: MutationCtx, startedAt: string, closedAt: string) {
    const startTs = new Date(startedAt).getTime();
    const endTs = new Date(closedAt).getTime();

    return await ctx.db.query("payments")
        .withIndex("index_date", q => q.gte("date", startTs).lte("date", endTs))
        .filter(q => q.eq(q.field("payslipId"), null))
        .collect();
}

async function getInvoicesInPeriod(ctx: MutationCtx, startedAt: string, closedAt: string) {
    const startTs = new Date(startedAt).getTime();
    const endTs = new Date(closedAt).getTime();

    return await ctx.db.query("invoices")
        .withIndex("index_date", q => q.gte("date", startTs).lte("date", endTs))
        .filter(q => q.eq(q.field("payslipId"), null))
        .collect();
}

async function createFeesForPeriod(ctx: MutationCtx, periodStart: string, feeAmount: number) {
    const activeChildren = await getActiveChildren(ctx);

    for (const child of activeChildren) {
        await ctx.db.insert("fees", {
            startedAt: periodStart,
            closedAt: null,
            totalAmount: feeAmount,
            state: "pending",
            childId: child._id,
        } as FeeData);
    }
}

export const closePayslip = zTeacherMutation({
    args: closePayslipValidator,
    handler: async (ctx, args): Promise<FullPayslip> => {
        const currentPayslip = await getCurrentOpenPayslip(ctx);
        if (!currentPayslip) {
            throw new Error("No open payslip found to close");
        }

        const now = new Date().toISOString();
        const startedAt = currentPayslip.startedAt;
        const closedAt = now;

        const payments = await getPaymentsInPeriod(ctx, startedAt, closedAt);
        const invoices = await getInvoicesInPeriod(ctx, startedAt, closedAt);

        const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);
        const totalSpent = invoices.reduce((sum, i) => sum + i.amount, 0);

        const closedPayslipId = await ctx.db.insert("payslips", {
            startedAt,
            closedAt,
            totalCollected,
            totalSpent,
            partnerPercentage: args.partnerPercentage,
            feeAmountUsed: args.feeAmount,
            teacherId: ctx.teacher._id,
        });

        for (const payment of payments) {
            await ctx.db.patch("payments", payment._id, { payslipId: closedPayslipId });
        }

        for (const invoice of invoices) {
            await ctx.db.patch("invoices", invoice._id, { payslipId: closedPayslipId });
        }

        const nextPayslipId = await ctx.db.insert("payslips", {
            startedAt: closedAt,
            closedAt: null,
            totalCollected: 0,
            totalSpent: 0,
            partnerPercentage: args.partnerPercentage,
            feeAmountUsed: args.feeAmount,
            teacherId: ctx.teacher._id,
        });

        await createFeesForPeriod(ctx, closedAt, args.feeAmount);

        const closedPayslip = await ctx.db.get("payslips", closedPayslipId);
        if (!closedPayslip) throw new Error("Failed to retrieve closed payslip");

        return await (async () => {
            const teacher = await ctx.db.get("teachers", closedPayslip.teacherId);
            const paymentsFull = await ctx.db.query("payments")
                .withIndex("index_payslip", q => q.eq("payslipId", closedPayslipId))
                .collect();
            const invoicesFull = await ctx.db.query("invoices")
                .withIndex("index_payslip", q => q.eq("payslipId", closedPayslipId))
                .collect();

            return { ...closedPayslip, teacher: teacher!, payments: paymentsFull, invoices: invoicesFull };
        })();
    }
});

export const deleteLastPayslip = zTeacherMutation({
    args: deleteLastPayslipValidator,
    handler: async (ctx): Promise<void> => {
        const payslips = await ctx.db.query("payslips")
            .withIndex("index_teacher", q => q.eq("teacherId", ctx.teacher._id))
            .order("desc")
            .collect();

        if (payslips.length < 2) {
            throw new Error("Cannot delete the only payslip or no previous payslip exists");
        }

        const latestPayslip = payslips[0];
        const previousPayslip = payslips[1];

        if (latestPayslip.closedAt === null) {
            throw new Error("Cannot delete an open payslip. Only closed payslips can be deleted.");
        }

        const payments = await ctx.db.query("payments")
            .withIndex("index_payslip", q => q.eq("payslipId", latestPayslip._id))
            .collect();

        for (const payment of payments) {
            await ctx.db.patch("payments", payment._id, { payslipId: null });
        }

        const invoices = await ctx.db.query("invoices")
            .withIndex("index_payslip", q => q.eq("payslipId", latestPayslip._id))
            .collect();

        for (const invoice of invoices) {
            await ctx.db.patch("invoices", invoice._id, { payslipId: null });
        }

        const feesToDelete = await ctx.db.query("fees")
            .withIndex("index_startedAt", q => q.eq("startedAt", latestPayslip.startedAt))
            .collect();

        for (const fee of feesToDelete) {
            const feePayments = await ctx.db.query("payments")
                .withIndex("index_fee", q => q.eq("feeId", fee._id))
                .collect();

            for (const payment of feePayments) {
                await ctx.db.delete("payments", payment._id);
            }

            await ctx.db.delete("fees", fee._id);
        }

        await ctx.db.patch("payslips", previousPayslip._id, { closedAt: null });
        await ctx.db.delete("payslips", latestPayslip._id);
    }
});