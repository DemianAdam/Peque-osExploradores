import z from "zod";

export const userValidator = z.object({
     username: z.string(),
});