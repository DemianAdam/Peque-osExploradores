import { zid } from "convex-helpers/server/zod4";
import z from "zod";
import { periodValidator, stateValidator } from "../common/validators";

export const feeValidator = z.object({
    period: periodValidator,
    totalAmount: z.number(),
    state: stateValidator,
    childrenId: zid("childrens")
});