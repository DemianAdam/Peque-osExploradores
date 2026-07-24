import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { InvoicesFormData } from "../../types/forms";

interface InvoicesFormProps {
  onSubmit: (data: InvoicesFormData) => void;
}

export function InvoicesForm({ onSubmit }: InvoicesFormProps) {
    const [formData, setFormData] = useState<InvoicesFormData>({
        description: "",
        amount: "",
        date: "",
    });
    
    const [errors, setErrors] = useState({
        description: "",
        date: "",
        amount: "",
    });

    const handleSave = () => {
        const newErrors = {
            description: "",
            date: "",
            amount: "",
        };

        let isValid = true;

        if (!formData.description || !formData.description.trim()) {
            newErrors.description = "La descripción es obligatoria.";
            isValid = false;
        }

        if (!formData.amount || Number(formData.amount) <= 0) {
            newErrors.amount = "El monto es obligatorio.";
            isValid = false;
        }

        if (!formData.date) {
            newErrors.date = "La fecha es obligatoria.";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return;

        onSubmit(formData);
    };

  return (
    <FormLayout onSubmit={handleSave}>
        <BaseInput
            label="Descripción"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            error={errors.description}
        />
        <BaseInput
            label="Monto"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            error={errors.amount}
            
        />
        <BaseInput
            label="Fecha"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={errors.date}
        />
    </FormLayout>
  );
}