import { Doc } from "../_generated/dataModel";
import { Payment } from "../payments/types";
import { Invoice } from "../invoices/types";

export type Payslip = Doc<"payslips">;

export type FullPayslip = Payslip & {
    payments: Payment[];
    invoices: Invoice[];
};