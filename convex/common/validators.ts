import { zid } from "convex-helpers/server/zod4";
import z from "zod";

export const stateValidator =  z.union([z.literal("pending"),z.literal("partial"),z.literal("paid")])