import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { PaymentFormData } from "../../types/forms";
import { BaseSelect } from "../UI/BaseSelect";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { formatDateForInput } from "../../common/dates";
import { formatFeeLabel } from "../../common/labels";

interface PaymentFormProps {
    onSubmit: (data: PaymentFormData) => void;
}


export function PaymentForm({ onSubmit }: PaymentFormProps) {
    const [formData, setFormData] = useState<PaymentFormData>({
        amount: 0,
        date: Date.now(),
        type: "cash",
        feeId: null,
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
                onChange={(value) => setFormData({
                    ...formData,
                    feeId: value
                })}
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
                onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).getTime() })}
                error={errors.date}
            />
        </FormLayout>
    );
}
