import { zid } from "convex-helpers/server/zod4";
import z from "zod";

const childrenIdValidator = zid("childrens");

export const childrenValidator = z.object({
    name: z.string(),
    groupId: zid("groups"),
    dni: z.string(),
    active: z.boolean()
});


export const createChildrenValidator = childrenValidator.omit({ active: true })

export const updateChildrenValidator = childrenValidator.partial().omit({ active: true }).extend({
    id: childrenIdValidator
})

export const deleteChildrenValidator = z.object({
    id: childrenIdValidator
})