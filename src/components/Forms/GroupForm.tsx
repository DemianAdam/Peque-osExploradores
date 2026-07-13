// src/components/Forms/GroupForm.tsx
import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { X } from "lucide-react";
import { useQuery } from "convex/react";
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

  return (
    <FormLayout title="Nuevo Grupo" onSubmit={() => onSubmit(formData)}>
      <BaseInput
        label="Nombre del Grupo"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      {/* Selector de Seños (Implementado con estilo similar a tus selects) */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">Asignar Seños</label>
        <select
          className="p-2 border rounded-lg"
          onChange={(e) => {
            const id = e.target.value;
            if (id && !formData.teacherIds.includes(id)) {
              setFormData({ ...formData, teacherIds: [...formData.teacherIds, id] });
            }
          }}
          value=""
        >
          <option value="" disabled>Seleccionar seño...</option>
          {teachers?.map((t) => (
            <option key={t._id} value={t._id}>{t.name}</option>
          ))}
        </select>

        {/* Tags de Seños seleccionadas */}
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.teacherIds.map((id) => {
            const teacher = teachers?.find((t) => t._id === id);
            return (
              <span key={id} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {teacher?.name}
                <button onClick={() => setFormData({ 
                  ...formData, 
                  teacherIds: formData.teacherIds.filter((tId) => tId !== id) 
                })}>
                  <X size={14} />
                </button>
              </span>
            );
          })}
        </div>
      </div>
    </FormLayout>
  );
}