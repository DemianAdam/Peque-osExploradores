import z from "zod";

export const groupValidator = z.object({
    name: z.string(),    
});