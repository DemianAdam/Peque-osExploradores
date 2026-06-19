import z from "zod";

export const userValidator = z.object({
     username: z.string(),
});

export const accountValidator = z.object({
     username: z.string(),
     password: z.string()
});