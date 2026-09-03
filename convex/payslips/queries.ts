import { zTeacherQuery } from "../zod";
import { Id } from "../_generated/dataModel";
import { FullPayslip } from "./types";
import z from "zod";
import { getCurrentOpenPayslip, toFullPayslip } from "./functions";

export const getPayslips = zTeacherQuery({
    args: {},
    handler: async (ctx): Promise<FullPayslip[]> => {
        const payslips = await ctx.db.query("payslips")
            .withIndex("index_closedByTeacher", q => q.eq("closedByTeacher", ctx.teacher._id))
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
        return await getCurrentOpenPayslip(ctx);
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
            .withIndex("index_closedByTeacher", q => q.eq("closedByTeacher", teacherId as Id<"teachers">))
            .order("desc")
            .collect();

        const fullPayslips = (await Promise.all(payslips.map(p => toFullPayslip(ctx, p))))
            .filter((p): p is FullPayslip => p !== null);

        return fullPayslips;
    }
});