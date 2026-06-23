import z from "zod";
import { periodValidator } from "../common/validators";
import { zid } from "convex-helpers/server/zod4";

export const payslipValidator = z.object({
    period: periodValidator,
    closedAt: z.string(),
    totalCollected: z.number(),
    totalSpent: z.number(),
    partnerPercentage: z.number(),
    techerId: zid("teachers")
});