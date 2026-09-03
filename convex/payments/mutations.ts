import { zTeacherMutation } from "../zod";
import { PaymentData } from "./types";
import { createPaymentValidator, updatePaymentValidator, deletePaymentValidator } from "./validators";
import { getCurrentOpenPayslip } from "../payslips/functions";
import { recomputeFeeState } from "./functions";

export const createPayment = zTeacherMutation({
    args: createPaymentValidator,
    handler: async (ctx, args) => {

        const fee = await ctx.db.get("fees", args.feeId);
        if (!fee) {
            throw new Error(`No Fee exists with id ${args.feeId}`);
        }

        if (fee.state === "paid") {
            throw new Error(`The Fee with id ${args.feeId} is already paid.`);
        }
        if (fee.totalAmount <= 0) {
            throw new Error(`The Fee with id ${args.feeId} cannot receive payments.`);
        }
        if (args.amount <= 0) {
            throw new Error("The payment amount must be a positive value.");
        }

        const currentPayslip = await getCurrentOpenPayslip(ctx);
        if(!currentPayslip){
            throw new Error("No current payslip to add the payment");
        }

        const newPayment: PaymentData = {
            ...args,
            teacherId: ctx.teacher._id,
            payslipId: currentPayslip?._id
        }

        await ctx.db.insert("payments", newPayment);

        await recomputeFeeState(ctx, args.feeId);
    }
})

export const updatePayment = zTeacherMutation({
    args: updatePaymentValidator,
    handler: async (ctx, args) => {
        const existingPayment = await ctx.db.get("payments", args.id);
        if (!existingPayment) {
            throw new Error(`No Payment exists with id ${args.id}`);
        }

        if (args.amount !== undefined && args.amount <= 0) {
            throw new Error("The payment amount must be a positive value.");
        }

        const { id, ...fields } = args;

        if (fields.feeId && fields.feeId !== existingPayment.feeId) {
            const newFee = await ctx.db.get("fees", fields.feeId);
            if (!newFee) {
                throw new Error(`No Fee exists with id ${fields.feeId}`);
            }
            if (newFee.state === "paid") {
                throw new Error(`The Fee with id ${fields.feeId} is already paid.`);
            }
        }

        await ctx.db.patch("payments", id, fields);

        if (fields.feeId && fields.feeId !== existingPayment.feeId) {
            await recomputeFeeState(ctx, existingPayment.feeId);
        }
        await recomputeFeeState(ctx, fields.feeId ?? existingPayment.feeId);
    }
})

export const deletePayment = zTeacherMutation({
    args: deletePaymentValidator,
    handler: async (ctx, args) => {
        const existingPayment = await ctx.db.get("payments", args.id);
        if (!existingPayment) {
            throw new Error(`No Payment exists with id ${args.id}`);
        }

        await ctx.db.delete("payments", args.id);

        await recomputeFeeState(ctx, existingPayment.feeId);
    }
})
