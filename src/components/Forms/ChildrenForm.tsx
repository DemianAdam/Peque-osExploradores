import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { BaseSelect } from "../UI/BaseSelect";
import { BaseSwitch } from "../UI/BaseSwitch";
import { FullChild, ChildData } from "../../../convex/children/types";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface ChildrenFormProps {
  onSubmit: (data: ChildData) => void;
  initialData?: FullChild;
}

export function ChildrenForm({ onSubmit, initialData }: ChildrenFormProps) {
  const groups = useQuery(api.groups.queries.getGroups);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ChildData>({
    name: initialData?.name || "",
    groupId: initialData?.groupId ?? null,
    active: initialData?.active ?? true,
    dni: initialData?.dni || "",
  });

  const formattedGroups = groups?.map((g) => ({
    label: g.name,
    value: g._id
  })) || [];

  const handleSave = () => {
    // 1. Validaciones básicas de texto
    if (!formData.name.trim()) return setError("El nombre es obligatorio.");
    if (!formData.dni.trim()) return setError("El DNI es obligatorio.");

    // 2. Validación de Grupo: Obligatorio si está activo
    if (formData.active && !formData.groupId) {
      return setError("Debe asignar un grupo a un niño activo.");
    }

    setError(null);
    onSubmit(formData);
  };

  return (
    <FormLayout onSubmit={handleSave}>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-xl text-sm font-medium mb-4">
          {error}
        </div>
      )}

      <BaseInput
        label="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <BaseInput
        label="DNI"
        value={formData.dni}
        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
      />

      {/* Selector de Grupo */}
      <BaseSelect
        label="Grupo"
        value={formData.groupId ?? ""}
        onChange={(value) => setFormData({ 
          ...formData, 
          groupId: value,
          active: true
        })}
        options={formattedGroups}
      />

      {initialData && (
        <BaseSwitch
          label="Estado Activo"
          checked={formData.active}
          onChange={(checked) => {
            setFormData({ 
              ...formData, 
              active: checked,
              // Lógica de UI: si desactiva, quitamos el grupo visualmente
              groupId: checked ? formData.groupId : null 
            });
          }}
        />
      )}
    </FormLayout>
  );
}