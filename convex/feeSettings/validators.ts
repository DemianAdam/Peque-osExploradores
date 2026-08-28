import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const feeSettingsValidator = z.object({
    feeAmount: z.number().min(0),
    partnerPercentage: z.number().min(0).max(100),
    updatedAt: z.number(),
    updatedBy: zid("teachers"),
});

export const updateFeeSettingsValidator = z.object({
    feeAmount: z.number().min(0).optional(),
    partnerPercentage: z.number().min(0).max(100).optional(),
});