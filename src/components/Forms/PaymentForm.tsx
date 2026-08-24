import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { PaymentFormData } from "../../types/forms";
import { BaseSelect } from "../UI/BaseSelect";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { formatDateForInput, parseInputDate } from "../../common/dates";
import { formatFeeLabel } from "../../common/labels";

interface PaymentFormProps {
    onSubmit: (data: PaymentFormData) => void;
}


// Evaluated once at module load — keeps the form prefilled with "today" without
// calling impure functions during render (react-hooks/purity). If the app stays
// open across midnight, this snapshot may be from yesterday.
const TODAY = Date.now();

export function PaymentForm({ onSubmit }: PaymentFormProps) {
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
    const unpaidFees = useQuery(api.fees.queries.getUnpaidFees);
    // TODO KAREN: si no hay cuotas pendientes el selector queda vacío sin mensaje (todavía no existe flujo de creación de cuotas). Agregar empty-state.
    // TODO KAREN: unpaidFees ya trae paidAmount: validar/cap el monto contra (totalAmount - paidAmount) antes de enviar, porque hoy los rechazos del servidor no se muestran en la UI.

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
                onChange={(e) => setFormData({ ...formData, date: parseInputDate(e.target.value) })}
                error={errors.date}
            />
        </FormLayout>
    );
}
