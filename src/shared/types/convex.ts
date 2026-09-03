// src/shared/types/convex.ts
// Re-exports Convex types to avoid deep relative imports

export type { Id } from "@convex/_generated/dataModel";

// Re-export specific domain types
export type { FullChild } from "@convex/children/types";
export type { FullGroup } from "@convex/groups/types";
export type { FullTeacher, Teacher } from "@convex/teachers/types";
export type { FullFee } from "@convex/fees/types";
export type { FullPayment } from "@convex/payments/types";
export type { Invoice } from "@convex/invoices/types";
export type { FullPayslip } from "@convex/payslips/types";