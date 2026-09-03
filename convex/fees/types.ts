import { Doc } from "../_generated/dataModel";
import { Child } from "../children/types";
import { TypeData } from "../common/types";
import { Payment } from "../payments/types";
import { Payslip } from "../payslips";

export type Fee = Doc<"fees">;

export type FeeData = TypeData<Fee>;

export type FullFee = Fee & {
    child: Child,
    paidAmount: number,
    payments?: Payment[],
    payslip: Payslip
}