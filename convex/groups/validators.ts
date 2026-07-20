import { zid } from "convex-helpers/server/zod4";
import z from "zod";

const groupIdValidator = zid("groups");

export const groupValidator = z.object({
    name: z.string(),    
});

export const createGroupValidator = groupValidator;

export const createGroupWithTeachersValidator = groupValidator.extend({
    teacherIds: z.array(zid("teachers")),
});

export const updateGroupValidator = groupValidator.partial().extend({
    id: groupIdValidator
});

export const deleteGroupValidator = z.object({
    id: groupIdValidator
});