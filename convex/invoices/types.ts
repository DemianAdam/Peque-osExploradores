import { Doc } from "../_generated/dataModel";
import { TypeData } from "../common/types";

export type Invoice = Doc<"invoices">

export type InvoiceData = TypeData<Invoice>