import z from "zod";

export const userValidator = z.object({
     user: z.string(),
});