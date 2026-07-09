// src/components/Forms/ChildrenForm.tsx
import { useState } from "react";
import { FormLayout } from "./FormLayout";
import { BaseInput } from "../UI/BaseInput";
import { BaseSelect } from "../UI/BaseSelect";
import { BaseSwitch } from "../UI/BaseSwitch";

interface ChildrenFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export function ChildrenForm({ onSubmit, initialData }: ChildrenFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    groupId: initialData?.groupId || "", 
    isActive: initialData?.isActive ?? true, 
    dni: initialData?.dni || "",
  });

  return (
    <FormLayout title={initialData ? "Editar" : "Nuevo"} onSubmit={() => onSubmit(formData)}>
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
        value={formData.groupId}
        onChange={(value) => setFormData({ ...formData, groupId: value })}
        options={[
            { label: "Grupo Verde", value: "id-verde" }, // Aquí deberías mapear tus grupos reales
            { label: "Grupo Rojo", value: "id-rojo" }
        ]}
      />
      
      {/* Switch de Estado */}
      <BaseSwitch 
        label="Estado Activo"
        checked={formData.isActive}
        onChange={(checked) => setFormData({ ...formData, isActive: checked })}
      />
    </FormLayout>
  );
}