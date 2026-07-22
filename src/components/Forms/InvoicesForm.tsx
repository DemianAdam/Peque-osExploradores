import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseSelect } from "../UI/BaseSelect";
import { BaseInput } from "../UI/BaseInput";

interface InvoicesData {
  description: string;
  mount: number | string;
  date: string;
  teacherId: string;
}

interface InvoicesFormProps {
  onSubmit: (data: InvoicesData) => void;
}

export function InvoicesForm({ onSubmit }: InvoicesFormProps) {
    const teachers = useQuery(api.teachers.queries.listTeachers);
    const [formData, setFormData] = useState<InvoicesData>({
        description: "",
        mount: "",
        date: "",
        teacherId: "",
    });
    
    const [errors, setErrors] = useState({
        description: "",
        date: "",
        teacherId: "",
        mount: "",
    });

    const formattedTeachers = teachers?.map((t) => ({
        label: t.name,
        value: t._id,
    })) || [];

    const handleSave = () => {
        const newErrors = {
            description: "",
            date: "",
            teacherId: "",
            mount: "",
        };

        let isValid = true;

        if (!formData.description || !formData.description.trim()) {
            newErrors.description = "La descripción es obligatoria.";
            isValid = false;
        }

        if (!formData.mount || Number(formData.mount) <= 0) {
            newErrors.mount = "El monto es obligatorio.";
            isValid = false;
        }

        if (!formData.date) {
            newErrors.date = "La fecha es obligatoria.";
            isValid = false;
        }

        if (!formData.teacherId) {
            newErrors.teacherId = "Debe seleccionar una seño.";
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
            value={formData.mount}
            onChange={(e) => setFormData({ ...formData, mount: e.target.value })}
            error={errors.mount}
            
        />
        <BaseInput
            label="Fecha"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={errors.date}
        />
        <BaseSelect
            label="Seño"
            value={formData.teacherId}
            onChange={(id) => setFormData({ ...formData, teacherId: id })}
            options={formattedTeachers}
            error={errors.teacherId}
        />
    </FormLayout>
  );
}