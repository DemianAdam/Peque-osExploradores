import { zTeacherMutation } from "../zod";
import { Invoice } from "./types";
import { createInvoiceValidator } from "./validators";

export const createInvoice = zTeacherMutation({
    args: createInvoiceValidator,
    handler: async (ctx, args) => {

        const newInvoice = {
            ...args,
            teacherId: ctx.teacher._id,
            date: Date.now(),
            payslipId: null,
        };

        await ctx.db.insert("invoices", newInvoice);
    }
})