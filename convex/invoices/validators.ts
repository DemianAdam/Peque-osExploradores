import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const invoiceValidator = z.object({
    description: z.string(),
    amount: z.number(),
    date: z.string(),
    teacherId: zid("teachers"),
    payslipId: zid("payslips")
});