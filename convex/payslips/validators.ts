import z from "zod";
import { zid } from "convex-helpers/server/zod4";

export const payslipValidator = z.object({
    startedAt: z.string(),
    closedAt: z.string(),
    totalCollected: z.number(),
    totalSpent: z.number(),
    partnerPercentage: z.number(),
    teacherId: zid("teachers")
});