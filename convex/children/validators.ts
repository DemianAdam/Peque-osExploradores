import { zid } from "convex-helpers/server/zod4";
import z from "zod";

const childIdValidator = zid("children");

export const childValidator = z.object({
    name: z.string(),
    groupId: zid("groups").nullable(),
    dni: z.string(),
    active: z.boolean(),
}).refine(
    data => data.active ? data.groupId !== null : true,
    { message: "Active children must have a group" }
);

export const createChildValidator = z.object({
    name: z.string(),
    groupId: zid("groups"),
    dni: z.string(),
})

export const updateChildValidator = z.object({
    id: childIdValidator,
    name: z.string().optional(),
    dni: z.string().optional(),
    groupId: zid("groups").nullable().optional(),
    active: z.union([z.literal(true), z.literal(false)]).optional(),
})
export const deleteChildValidator = z.object({
    id: childIdValidator
})