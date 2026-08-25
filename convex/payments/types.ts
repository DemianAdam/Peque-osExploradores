import z from "zod";
import { Doc } from "../_generated/dataModel";
import { TypeData } from "../common/types";
import { createPaymentValidator } from "./validators";
import { FullFee } from "../fees/types";
import { Teacher } from "../teachers/types";

export type Payment = Doc<"payments">

export type PaymentData = TypeData<Payment>

export type CreatePaymentData = z.infer<typeof createPaymentValidator>

export type FullPayment = Payment & {
    fee: FullFee,
    teacher: Teacher
}
