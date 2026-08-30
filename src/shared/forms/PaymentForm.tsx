import { useState, useEffect } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "@ui/BaseInput";
import { PaymentFormData } from "@shared/types/forms";
import { BaseSelect } from "@ui/BaseSelect";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { formatDateForInput, parseInputDate } from "@utils/dates";
import { formatFeeLabel } from "@utils/labels";
import { Id } from "@convex/_generated/dataModel";


interface PaymentFormProps {
    onSubmit: (data: PaymentFormData) => void;
    initialFeeId?: string;
    initialAmount?: number;
}

const TODAY = Date.now();

export function PaymentForm({ onSubmit, initialFeeId, initialAmount }: PaymentFormProps) {
    const [formData, setFormData] = useState<PaymentFormData>({
        amount: initialAmount || 0,
        date: TODAY,
        type: "cash",
        feeId: (initialFeeId as Id<"fees">) || null,
    });

    const [errors, setErrors] = useState({
        amount: "",
        date: "",
        type: "",
        feeId: "",
    });

    const unpaidFees = useQuery(api.fees.queries.getUnpaidFees);

    const formattedFees = unpaidFees?.map((f) => ({
        label: formatFeeLabel(f),
        value: f._id
    })) || [];

    // 💡 EFECTO INTELIGENTE: Si cambian los props iniciales (por ejemplo, al venir desde la tabla de cuotas), 
    // actualizamos el estado del formulario de manera sincronizada.
    useEffect(() => {
        if (initialFeeId) {
            setFormData(prev => ({
                ...prev,
                feeId: initialFeeId as Id<"fees">,
                amount: initialAmount !== undefined ? initialAmount : prev.amount
            }));
        }
    }, [initialFeeId, initialAmount]);

    const handleFeeChange = (selectedFeeId: string) => {
        const selectedFee = unpaidFees?.find(f => f._id === selectedFeeId);
        
        if (selectedFee) {
            const remainingBalance = selectedFee.totalAmount - (selectedFee.paidAmount || 0);
            setFormData(prev => ({
                ...prev,
                feeId: selectedFeeId as Id<"fees">, // 👈 Casteo explícito aquí
                amount: remainingBalance > 0 ? remainingBalance : 0
            }));
        } else {
            setFormData(prev => ({ 
                ...prev, 
                feeId: selectedFeeId as Id<"fees"> // 👈 Y aquí también
            }));
        }
    };

    const handleSave = () => {
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

        if (!isValid) return;

        onSubmit(formData);
    };

    return (
        <FormLayout onSubmit={handleSave}>
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
    );
}