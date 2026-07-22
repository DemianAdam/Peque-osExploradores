import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { payslipValidator } from "./validators";

const schema = zodOutputToConvex(payslipValidator);

export const payslipSchema = defineTable(schema)
