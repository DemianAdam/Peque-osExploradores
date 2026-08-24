import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { PaymentFormData } from "../../types/forms";

interface PaymentFormProps {
  onSubmit: (data: PaymentFormData) => void;
}

// Mock de cuotas disponibles para simular el selector (puedes reemplazarlo por tus datos reales)
const AVAILABLE_FEES = [
  { id: "fee_1", name: "Cuota 6 - Mateo Brito" },
  { id: "fee_2", name: "Cuota 7 - Lucía Pérez" },
  { id: "fee_3", name: "Cuota 8 - Sofía Gómez" },
  { id: "fee_4", name: "Cuota 9 - Lucas Benítez" },
];

export function PaymentForm({ onSubmit }: PaymentFormProps) {
    const [formData, setFormData] = useState<PaymentFormData>({
        amount: 0,
        date: Date.now(),
        type: "cash",
        feeId: "",
    });
    
    const [errors, setErrors] = useState({
        amount: "",
        date: "",
        type: "",
        feeId: "",
    });

    const handleSave = () => {
        const newErrors = {
            amount: "",
            date: "",
            type: "",
            feeId: "",
        };

        let isValid = true;

        if (!formData.amount || formData.amount <= 0) {
            newErrors.amount = "El monto debe ser mayor a 0.";
            isValid = false;
        }

        if (!formData.date) {
            newErrors.date = "La fecha es obligatoria.";
            isValid = false;
        }

        if (!formData.type) {
            newErrors.type = "El tipo de pago es obligatorio.";
            isValid = false;
        }

        if (!formData.feeId || !formData.feeId.trim()) {
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
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Cuota</label>
            <select
                value={formData.feeId}
                onChange={(e) => setFormData({ ...formData, feeId: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-3 bg-white outline-none font-medium text-slate-800 text-sm focus:border-emerald-500 transition-colors"
            >
                <option value="" disabled>Selecciona una cuota</option>
                {AVAILABLE_FEES.map((fee) => (
                    <option key={fee.id} value={fee.id}>{fee.name}</option>
                ))}
            </select>
            {errors.feeId && <span className="text-red-500 text-xs font-semibold ml-1">{errors.feeId}</span>}
        </div>

        {/* Tipo de Pago */}
        <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Tipo de Pago</label>
            <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as "cash" | "transfer" })}
                className="w-full border border-gray-300 rounded-xl p-3 bg-white outline-none font-medium text-slate-800 text-sm focus:border-emerald-500 transition-colors"
            >
                <option value="cash">Efectivo</option>
                <option value="transfer">Transferencia</option>
            </select>
            {errors.type && <span className="text-red-500 text-xs font-semibold ml-1">{errors.type}</span>}
        </div>

        <BaseInput
            label="Fecha"
            type="date"
            value={formData.date ? new Date(formData.date).toISOString().split("T")[0] : ""}
            onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).getTime() })}
            error={errors.date}
        />
    </FormLayout>
  );
}