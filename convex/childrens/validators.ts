import { zid } from "convex-helpers/server/zod4";
import z from "zod";

const childrenIdValidator = zid("childrens");

export const childrenValidator = z.object({
    name: z.string(),
    groupId: zid("groups").nullable(),
    dni: z.string(),
    active: z.boolean(),
}).refine(
    data => data.active ? data.groupId !== null : true,
    { message: "Active children must have a group" }
);


export const createChildrenValidator = childrenValidator.omit({ active: true })

export const updateChildrenValidator = z.object({
    id: childrenIdValidator,
    name: z.string().optional(),
    dni: z.string().optional(),
    groupId: zid("groups").nullable().optional(),
    active: z.union([z.literal(true), z.literal(false)]).optional(),
})
export const deleteChildrenValidator = z.object({
    id: childrenIdValidator
})