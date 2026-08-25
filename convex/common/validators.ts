import z from "zod";

export const stateValidator =  z.union([z.literal("pending"),z.literal("partial"),z.literal("paid")])