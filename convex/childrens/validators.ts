import { zid } from "convex-helpers/server/zod4";
import z from "zod";

const childrenIdValidator = zid("childrens");

export const childrenValidator = z.union([
    z.object({
        name: z.string(),
        groupId: zid("groups"),
        dni: z.string(),
        active: z.literal(true)
    }),
    z.object({
        name: z.string(),
        groupId: zid("groups").nullable(),
        dni: z.string(),
        active: z.literal(false)
    })
]);


export const createChildrenValidator = childrenValidator.options[0].omit({ active: true })

export const updateChildrenValidator = childrenValidator.options[0].partial().extend({
    id: childrenIdValidator
})

export const deleteChildrenValidator = z.object({
    id: childrenIdValidator
})