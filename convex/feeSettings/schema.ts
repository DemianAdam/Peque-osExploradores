import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { feeSettingsValidator } from "./validators";

const schema = zodOutputToConvex(feeSettingsValidator);

export const feeSettingsSchema = defineTable(schema);