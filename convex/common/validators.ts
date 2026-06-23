import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const periodValidator = z.object({month:z.number().min(1).max(12), year:z.number().min(2025)})

export const stateValidator =  z.union([z.literal("pending"),z.literal("partial"),z.literal("paid")])