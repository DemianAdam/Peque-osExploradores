import { Id } from "../_generated/dataModel";
import { MutationCtx } from "../_generated/server";


export async function getInvoicesByPayslip(ctx: MutationCtx, payslipId: Id<"payslips">) {
    return await ctx.db.query("invoices")
        .withIndex("index_payslip", q => q.eq("payslipId", payslipId))
        .collect();
}
