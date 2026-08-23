import { Doc } from "../_generated/dataModel";
import { Child } from "../children/types";
import { TypeData } from "../common/types";

export type Fee = Doc<"fees">;

export type FeeData = TypeData<Fee>;

export type FullFee = Fee & {
    child: Child,
    paidAmount: number
}