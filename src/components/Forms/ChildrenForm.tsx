// src/components/Forms/ChildrenForm.tsx
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

  const formattedGroups = groups?.map((g) => ({
    label: g.name,
    value: g._id
  }));

  const [formData, setFormData] = useState<ChildData>({
    name: initialData?.name || "",
    groupId: initialData?.groupId ?? null,
    active: initialData?.active ?? true,
    dni: initialData?.dni || "",
  });

  return (
    <FormLayout  onSubmit={() => onSubmit(formData)}>
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
      {formattedGroups && <BaseSelect
        label="Grupo"
        value={formData.groupId ?? ""}
        onChange={(value) => setFormData({ ...formData, groupId: value as Id<"groups"> })}
        options={formattedGroups}
      />}

      {/* Switch de Estado */}
      {initialData && <BaseSwitch
        label="Estado Activo"
        checked={formData.active}
        onChange={(checked) => setFormData({ ...formData, active: checked })}
      />}
    </FormLayout>
  );
}