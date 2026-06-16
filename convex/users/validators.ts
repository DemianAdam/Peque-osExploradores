import z from "zod";

export const userValidator = z.object({
    email: z.string(),
    name: z.string()
});