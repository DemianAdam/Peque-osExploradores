import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const groupTeacherValidator = z.object({
    teacherId: zid("teachers"),
    groupId: zid("groups"),
});