import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { invoiceValidator } from "./validators";

const schema = zodOutputToConvex(invoiceValidator);

export const invoiceSchema = defineTable(schema)
    .index("index_date", ["date"])
    .index("index_teacher", ["teacherId"])
    .index("index_payslip", ["payslipId"])