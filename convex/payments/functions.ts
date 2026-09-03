import { Id } from "../_generated/dataModel";
import { MutationCtx } from "../_generated/server";


export async function getPaymentsByPayslip(ctx: MutationCtx, payslipId: Id<"payslips">) {
    return await ctx.db.query("payments")
        .withIndex("index_payslip", q => q.eq("payslipId", payslipId))
        .collect();
}

export async function recomputeFeeState(ctx: MutationCtx, feeId: Id<"fees">) {
    const fee = await ctx.db.get("fees", feeId);
    if (!fee) {
        throw new Error(`No Fee exists with id ${feeId}`);
    }

    const payments = await ctx.db.query("payments")
        .withIndex("index_fee", (q) => q.eq("feeId", feeId))
        .collect();

    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    const remainingAmount = fee.totalAmount - totalPaid;

    if (remainingAmount < 0) {
        throw new Error(`The payments exceed the total amount of the Fee by ${-remainingAmount}. Total amount: ${fee.totalAmount}`);
    }

    const state = remainingAmount === 0
        ? "paid"
        : totalPaid > 0 ? "partial" : "pending";

    if (state !== fee.state) {
        await ctx.db.patch("fees", feeId, { state });
    }
}

