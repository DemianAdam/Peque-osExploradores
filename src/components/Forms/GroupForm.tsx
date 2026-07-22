// src/components/Forms/GroupForm.tsx
import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { X } from "lucide-react";
import { useQuery } from "convex/react";
import { BaseSelect } from "../UI/BaseSelect";
import { api } from "../../../convex/_generated/api";


interface GroupData {
  name: string;
  teacherIds: string[];
}

interface GroupFormProps {
  onSubmit: (data: GroupData) => void;
}

export function GroupForm({ onSubmit }: GroupFormProps) {
  const teachers = useQuery(api.teachers.queries.listTeachers); // TODO: Ajustar nombre de query
  const [formData, setFormData] = useState<GroupData>({
    name: "",
    teacherIds: [],
  });
  const [errors, setErrors] = useState({
          name: "",
          teacherId: "",
      });
  const formattedTeachers = teachers?.map((t) => ({
    label: t.name,
    value: t._id,
  })) || [];

  const handleSave = () => {
        const newErrors = {
            name: "",
            teacherId: "",
        };

        let isValid = true;

        if (!formData.name || !formData.name.trim()) {
            newErrors.name = "El nombre del grupo es obligatorio.";
            isValid = false;
        }

        if (!formData.teacherIds.length) {
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
        label="Nombre del Grupo"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />

      {/* Selector reutilizado */}
      <BaseSelect
        label="Asignar Seños"
        value="" 
        onChange={(id) => {
          if (id && !formData.teacherIds.includes(id)) {
            setFormData({ ...formData, teacherIds: [...formData.teacherIds, id] });
          }
        }}
        options={formattedTeachers}
        error={errors.teacherId}
      />

        {/* Tags de Seños seleccionadas */}
      <div className="flex flex-wrap gap-2 mt-2">
        {formData.teacherIds.map((id) => {
          const teacher = teachers?.find((t) => t._id === id);
          return (
            <span key={id} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {teacher?.name}
              <button type="button" onClick={() => setFormData({ 
                ...formData, 
                teacherIds: formData.teacherIds.filter((tId) => tId !== id) 
              })}>
                <X size={14} />
              </button>
            </span>
          );
        })}
      </div>
    </FormLayout>
  );
}
