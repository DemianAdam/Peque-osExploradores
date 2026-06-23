import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const teacherValidator = z.object({
    name: z.string(),
    userId: zid("users")
});