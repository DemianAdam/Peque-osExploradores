import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const childrenValidator = z.object({
    name: z.string(),
    groupId: zid("groups"),
    dni: z.string,
    active: z.boolean()
});


export const createChildrenValidator = childrenValidator.omit({ active: true })