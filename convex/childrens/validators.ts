import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const childrenValidator = z.object({
    name: z.string(),
    groupId: zid("groups"),
    active: z.boolean()
});