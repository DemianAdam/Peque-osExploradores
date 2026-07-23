import { zTeacherMutation } from "../zod";
import { InvoiceData } from "./types";
import { createInvoiceValidator, updateInvoiceValidator, deleteInvoiceValidator } from "./validators";

export const createInvoice = zTeacherMutation({
    args: createInvoiceValidator,
    handler: async (ctx, args) => {

        const newInvoice: InvoiceData = {
            ...args,
            teacherId: ctx.teacher._id,
            payslipId: null,
        };

        await ctx.db.insert("invoices", newInvoice);
    }
})

export const updateInvoice = zTeacherMutation({
    args: updateInvoiceValidator,
    handler: async (ctx, args) => {
        const existingInvoice = await ctx.db.get("invoices", args.id);
        if (!existingInvoice) {
            throw new Error(`No Invoice exists with id ${args.id}`);
        }

        const { id, ...fields } = args;
        await ctx.db.patch("invoices", id, fields);
    }
})

export const deleteInvoice = zTeacherMutation({
    args: deleteInvoiceValidator,
    handler: async (ctx, args) => {
        const existingInvoice = await ctx.db.get("invoices", args.id);
        if (!existingInvoice) {
            throw new Error(`No Invoice exists with id ${args.id}`);
        }

        await ctx.db.delete("invoices", args.id);
    }
})
