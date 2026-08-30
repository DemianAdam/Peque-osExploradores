import { zTeacherQuery } from "../zod";
import { QueryCtx } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import { FullPayslip, Payslip } from "./types";
import { Payment } from "../payments/types";
import { Invoice } from "../invoices/types";
import { Teacher } from "../teachers/types";
import z from "zod";

async function toFullPayslip(ctx: QueryCtx, payslip: Payslip): Promise<FullPayslip | null> {
    const teacher = await ctx.db.get("teachers", payslip.teacherId);
    if (!teacher) return null;

    const payments = await ctx.db.query("payments")
        .withIndex("index_payslip", q => q.eq("payslipId", payslip._id))
        .collect();

    const invoices = await ctx.db.query("invoices")
        .withIndex("index_payslip", q => q.eq("payslipId", payslip._id))
        .collect();

    return { ...payslip, teacher, payments, invoices };
}

export const getPayslips = zTeacherQuery({
    args: {},
    handler: async (ctx): Promise<FullPayslip[]> => {
        const payslips = await ctx.db.query("payslips")
            .withIndex("index_teacher", q => q.eq("teacherId", ctx.teacher._id))
            .order("desc")
            .collect();

        const fullPayslips = (await Promise.all(payslips.map(p => toFullPayslip(ctx, p))))
            .filter((p): p is FullPayslip => p !== null);

        return fullPayslips;
    }
});

export const getCurrentPayslip = zTeacherQuery({
    args: {},
    handler: async (ctx): Promise<FullPayslip | null> => {

        const payslip = await ctx.db.query("payslips")
            .filter(q => q.eq(q.field("closedAt"), null))
            .first();

        if (!payslip) return null;

        return await toFullPayslip(ctx, payslip);
    }
});

export const getPayslipById = zTeacherQuery({
    args: { payslipId: z.string() },
    handler: async (ctx, { payslipId }): Promise<FullPayslip | null> => {
        const payslip = await ctx.db.get("payslips", payslipId as Id<"payslips">);
        if (!payslip) return null;

        return await toFullPayslip(ctx, payslip);
    }
});

export const getPayslipsByTeacher = zTeacherQuery({
    args: { teacherId: z.string() },
    handler: async (ctx, { teacherId }): Promise<FullPayslip[]> => {
        const payslips = await ctx.db.query("payslips")
            .withIndex("index_teacher", q => q.eq("teacherId", teacherId as Id<"teachers">))
            .order("desc")
            .collect();

        const fullPayslips = (await Promise.all(payslips.map(p => toFullPayslip(ctx, p))))
            .filter((p): p is FullPayslip => p !== null);

        return fullPayslips;
    }
});