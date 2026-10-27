
// src/features/groups/pages/GroupCreator.tsx
import { useMutation } from "convex/react";
import { GroupForm } from "@shared/forms/GroupForm";
import { useNavigate } from "react-router";
import { api } from "@convex/_generated/api";


export default function GroupCreator() {
  const navigate = useNavigate();
  const createGroupWithTeachers = useMutation(api.groups.mutations.createGroupWithTeachers);

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl font-bold mb-5">Nuevo Grupo</h1>
      <GroupForm
        onSubmit={async (data) => {
          try {
            await createGroupWithTeachers(data);
            navigate("/grupos");
          } catch (error) {
            console.error("No se pudo crear el grupo:", error);
            alert("No se pudo crear el grupo.");
          }
        }}
      />
    </div>
  );
}