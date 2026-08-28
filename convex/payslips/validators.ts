import z from "zod";
import { zid } from "convex-helpers/server/zod4";

export const payslipValidator = z.object({
    startedAt: z.string(),
    closedAt: z.string().nullable(),
    totalCollected: z.number(),
    totalSpent: z.number(),
    partnerPercentage: z.number(),
    feeAmountUsed: z.number(),
    teacherId: zid("teachers")
});