import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
import { userSchema } from "./users/schema";
import { teacherSchema } from "./teachers/schema";
import { payslipSchema } from "./payslips/schema";
import { paymentSchema } from "./payments/schema";
import { invoiceSchema } from "./invoices/schema";
import { groupSchema } from "./groups/schema";
import { groupTeacherSchema } from "./group_teachers/schema";
import { feeSchema } from "./fees/schema";
import { childrenSchema } from "./childrens/schema";

export default defineSchema({
  ...authTables,
  users: userSchema,
  teachers: teacherSchema,
  payslips: payslipSchema,
  payments: paymentSchema,
  invoices: invoiceSchema,
  groups: groupSchema,
  group_teachers: groupTeacherSchema,
  fees: feeSchema,
  childrens: childrenSchema
});
