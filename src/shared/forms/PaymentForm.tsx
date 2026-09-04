import { useState, useEffect } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "@ui/BaseInput";
import { PaymentFormData } from "@shared/types/forms";
import { BaseSelect } from "@ui/BaseSelect";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { formatDate, formatDateForInput, parseInputDate } from "@utils/dates";
import { formatFeeLabel } from "@utils/labels";
import { Id } from "@convex/_generated/dataModel";

interface PaymentFormProps {
    onSuccess?: () => void;
    initialFeeId?: string;
}

type CreatePaymentInput = Omit<PaymentFormData, "feeId"> & { feeId: Id<"fees"> };

const TODAY = Date.now();

export function PaymentForm({ onSuccess, initialFeeId }: PaymentFormProps) {
    const [formData, setFormData] = useState<PaymentFormData>({
        amount: 0,
        date: TODAY,
        type: "cash",
        feeId: null,
    });

    const [errors, setErrors] = useState({
        amount: "",
        date: "",
        type: "",
        feeId: "",
    });

    const [selectedFeeId, setSelectedFeeId] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");

    const createPayment = useMutation(api.payments.mutations.createPayment);

    const unpaidFees = useQuery(api.fees.queries.getUnpaidFees);

    const formattedFees = unpaidFees?.map((f) => ({
        label: formatFeeLabel(f),
        value: f._id
    })) || [];

    useEffect(() => {
        if (initialFeeId && unpaidFees?.some(f => f._id === initialFeeId)) {
            setTimeout(() => setSelectedFeeId(initialFeeId), 0);
        } else if (!selectedFeeId && unpaidFees?.[0]) {
            setTimeout(() => setSelectedFeeId(unpaidFees[0]._id), 0);
        }
    }, [initialFeeId, unpaidFees, selectedFeeId]);

    useEffect(() => {
        const fee = unpaidFees?.find(f => f._id === selectedFeeId);
        if (fee) {
            const remaining = fee.totalAmount - (fee.paidAmount || 0);
            setTimeout(() => {
                setFormData(prev => ({
                    ...prev,
                    feeId: selectedFeeId as Id<"fees">,
                    amount: remaining > 0 ? remaining : 0
                }));
            }, 0);
        } else {
            setTimeout(() => {
                setFormData(prev => ({ ...prev, feeId: null, amount: 0 }));
            }, 0);
        }
    }, [selectedFeeId, unpaidFees]);

    const handleFeeChange = (feeId: string) => {
        setSelectedFeeId(feeId);
    };

    const handleSave = async () => {
        const newErrors = {
            amount: "",
            date: "",
            type: "",
            feeId: "",
        };

        let isValid = true;

        if (!formData?.amount || formData.amount <= 0) {
            newErrors.amount = "El monto debe ser mayor a 0.";
            isValid = false;
        }

        if (!formData?.date) {
            newErrors.date = "La fecha es obligatoria.";
            isValid = false;
        }

        if (!formData?.type) {
            newErrors.type = "El tipo de pago es obligatorio.";
            isValid = false;
        }

        if (!formData?.feeId || !formData.feeId.trim()) {
            newErrors.feeId = "La cuota es obligatoria.";
            isValid = false;
        }

        setErrors(newErrors);
        setSubmitError("");

        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const paymentInput: CreatePaymentInput = {
                ...formData,
                feeId: formData.feeId!,
            };
            await createPayment(paymentInput);
            onSuccess?.();
        } catch {
            setSubmitError("No se pudo crear el pago. Intente nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const selectedFee = unpaidFees?.find(f => f._id === selectedFeeId);
    const remainingAmount = selectedFee ? selectedFee.totalAmount - (selectedFee.paidAmount || 0) : 0;

    return (
        <>
            {selectedFee && (
                <div className="mb-4 mx-auto w-full max-w-lg bg-white/80 p-4 rounded-xl shadow-sm text-sm text-slate-700 flex justify-between items-center">
                    <div className="flex w-full text-xl gap-6">
                        <span className="font-bold text-slate-500">Saldo pendiente a cubrir:</span>
                        <span className="font-bold text-emerald-600 ">${remainingAmount.toLocaleString()}</span>
                    </div>
                </div>
            )}
            <FormLayout onSubmit={handleSave}>


                {submitError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {submitError}
                    </div>
                )}

                <BaseInput
                    label="Monto"
                    type="number"
                    value={formData.amount || ""}
                    onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                    error={errors.amount}
                />

                {/* Selector de Cuota */}
                <BaseSelect
                    label="Cuota"
                    value={formData.feeId ?? ""}
                    onChange={handleFeeChange}
                    options={formattedFees}
                    error={errors.feeId}
                />

                {/* Tipo de Pago */}
                <BaseSelect<"cash" | "transfer">
                    label="Tipo de Pago"
                    value={formData.type}
                    onChange={(type) => setFormData({ ...formData, type })}
                    options={[
                        { label: "Efectivo", value: "cash" },
                        { label: "Transferencia", value: "transfer" },
                    ]}
                    error={errors.type}
                />

                <BaseInput
                    label="Fecha"
                    type="date"
                    value={formData.date ? formatDateForInput(formData.date) : ""}
                    onChange={(e) => setFormData({ ...formData, date: parseInputDate(e.target.value) })}
                    error={errors.date}
                />

               
            </FormLayout>
        </>
    );
}