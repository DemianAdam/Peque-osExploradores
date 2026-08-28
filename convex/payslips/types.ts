import { Doc } from "../_generated/dataModel";
import { Teacher } from "../teachers/types";
import { Payment } from "../payments/types";
import { Invoice } from "../invoices/types";

export type Payslip = Doc<"payslips">;

export type FullPayslip = Payslip & {
    teacher: Teacher;
    payments: Payment[];
    invoices: Invoice[];
};