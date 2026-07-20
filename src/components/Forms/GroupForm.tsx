// src/components/Forms/GroupForm.tsx
import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { X } from "lucide-react";
import { useQuery } from "convex/react";
import { BaseSelect } from "../UI/BaseSelect";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface GroupData {
  name: string;
  teacherIds: Id<"teachers">[];
}

interface GroupFormProps {
  onSubmit: (data: GroupData) => void;
}

export function GroupForm({ onSubmit }: GroupFormProps) {
  const teachers = useQuery(api.teachers.queries.getTeachers); // TODO: Ajustar nombre de query
  const [formData, setFormData] = useState<GroupData>({
    name: "",
    teacherIds: [],
  });
  const [error, setError] = useState<string | null>(null);
  const formattedTeachers = teachers?.map((t) => ({
    label: t.name,
    value: t._id,
  })) || [];

  const handleSave = () => {
    // 1. Validamos usando .trim() para evitar nombres que solo sean espacios
    if (!formData.name.trim()) {
      setError("El nombre del grupo es obligatorio.");
      return;
    }
    onSubmit(formData);
  };

  return (
    <FormLayout onSubmit={handleSave}>
      {/* El error aparecerá aquí arriba si falla la validación */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm font-medium mb-4">
          {error}
        </div>
      )}
      <BaseInput
        label="Nombre del Grupo"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
