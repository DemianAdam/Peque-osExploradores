import { zid } from "convex-helpers/server/zod4";
import z from "zod";
import { stateValidator } from "../common/validators";

export const feeValidator = z.object({
    startedAt: z.number(),
    closedAt: z.number().nullable(),
    totalAmount: z.number(),
    state: stateValidator,
    childId: zid("children")
});