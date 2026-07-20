import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const paymentValidator = z.object({
    amount: z.number(),
    date: z.number(),
    type: z.union([z.literal("cash"), z.literal("transfer")]),
    feeId: zid("fees"),
    teacherId: zid("teachers"),
    payslipId: zid("payslips").nullable()
});