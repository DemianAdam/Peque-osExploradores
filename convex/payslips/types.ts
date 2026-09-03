import { Doc } from "../_generated/dataModel";
import { Payment } from "../payments/types";
import { Invoice } from "../invoices/types";
import { Teacher } from "../teachers/types";
import { TypeData } from "../common/types";

export type Payslip = Doc<"payslips">;

export type PayslipData = TypeData<Payslip>;

export type FullPayslip = Payslip & {
    payments: Payment[];
    invoices: Invoice[];
    teacher: Teacher | null;
};