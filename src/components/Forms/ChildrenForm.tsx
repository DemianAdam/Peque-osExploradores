import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { BaseSelect } from "../UI/BaseSelect";
import { BaseSwitch } from "../UI/BaseSwitch";
import { FullChild, ChildData } from "../../../convex/children/types";
import { Id } from "../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";



interface ChildrenFormProps {
  onSubmit: (data: ChildData) => void;
  initialData?: FullChild;
}

export function ChildrenForm({ onSubmit, initialData }: ChildrenFormProps) {
  const groups = useQuery(api.groups.queries.getGroups);
  const [errors, setErrors] = useState({
            name: "",
            groupId: "",
            dni: "",
        });

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
        const newErrors = {
            name: "",
            groupId: "",
            dni: "",
        };

        let isValid = true;

        if (!formData.name || !formData.name.trim()) {
            newErrors.name = "El nombre del explorador es obligatorio.";
            isValid = false;
        }

        if (!formData.groupId) {
            newErrors.groupId = "Debe seleccionar un grupo.";
            isValid = false;
        }

        if (!formData.dni || !formData.dni.trim()) {
            newErrors.dni = "El DNI es obligatorio.";
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) return;

        onSubmit(formData);
    };


  return (
    <FormLayout onSubmit={handleSave}>
      
      <BaseInput
        label="Nombre"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        error={errors.name}
      />

      <BaseInput
        label="DNI"
        value={formData.dni}
        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
        error={errors.dni}
      />

      {/* Selector de Grupo */}
      <BaseSelect
        label="Grupo"
        value={formData.groupId ?? ""}
        onChange={(value) => setFormData({ 
          ...formData, 
          groupId: value as Id<"groups">,
          active: true // Forzamos a que se active al seleccionar un grupo
        })}
        options={formattedGroups}
        error={errors.groupId}
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