import z from "zod";
import { zid } from "convex-helpers/server/zod4";

export const payslipValidator = z.object({
    startedAt: z.number(),
    closedAt: z.number().nullable(),
    totalCollected: z.number(),
    totalSpent: z.number(),
    partnerPercentage: z.number(),
    feeAmountUsed: z.number(),
    closedByTeacher: zid("teachers").nullable()
});

export const createFirstPayslipValidator = z.object({
    partnerPercentage: z.number().min(0).max(100),
    feeAmountUsed: z.number().min(0)
});
export const deleteLastPayslipValidator = z.object({});
export const closePayslipValidator = z.object({
    partnerPercentage: z.number().min(0).max(100),
});

