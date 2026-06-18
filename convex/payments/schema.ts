import { zodOutputToConvex } from "convex-helpers/server/zod";
import { defineTable } from "convex/server";
import { paymentValidator } from "./validators";

const schema = zodOutputToConvex(paymentValidator);

export const paymentSchema = defineTable(schema)
    .index("index_date", ["date"])
    .index("index_teacher", ["teacherId"])
    .index("index_payslip", ["payslipId"])
    .index("index_fee", ["feeId"])