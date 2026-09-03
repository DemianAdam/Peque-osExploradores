import { QueryCtx } from "../_generated/server";
import { FullPayslip, Payslip } from "./types";


export async function getCurrentOpenPayslip(ctx: QueryCtx): Promise<FullPayslip | null> {
    const payslip = await ctx.db.query("payslips")
        .withIndex("index_closedAt", q => q.eq("closedAt", null))
        .first();

    if (!payslip) return null;

    return toFullPayslip(ctx, payslip);
}
export async function toFullPayslip(ctx: QueryCtx, payslip: Payslip): Promise<FullPayslip | null> {
    const payments = await ctx.db.query("payments")
        .withIndex("index_payslip", q => q.eq("payslipId", payslip._id))
        .collect();

    const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);

    const invoices = await ctx.db.query("invoices")
        .withIndex("index_payslip", q => q.eq("payslipId", payslip._id))
        .collect();

    const totalSpent = invoices.reduce((sum, i) => sum + i.amount, 0);

    let teacher = null;
    if (payslip.closedByTeacher) {
        teacher = await ctx.db.get("teachers", payslip.closedByTeacher);
    }


    const fullPayslip: FullPayslip = {
        ...payslip,
        payments,
        invoices,
        totalCollected,
        totalSpent,
        teacher
    };

    return fullPayslip;
}

