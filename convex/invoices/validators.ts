import { zid } from "convex-helpers/server/zod4";
import z from "zod";

const invoiceIdValidator = zid("invoices");

export const invoiceValidator = z.object({
    description: z.string(),
    amount: z.number(),
    date: z.number(),
    teacherId: zid("teachers"),
    payslipId: zid("payslips").nullable()
});

export const createInvoiceValidator = invoiceValidator
    .omit({
        payslipId: true,
        teacherId: true,
    });

export const updateInvoiceValidator = z.object({
    id: invoiceIdValidator,
    description: z.string().optional(),
    amount: z.number().optional(),
    date: z.number().optional(),
    payslipId: zid("payslips").nullable().optional(),
});

export const deleteInvoiceValidator = z.object({
    id: invoiceIdValidator
});