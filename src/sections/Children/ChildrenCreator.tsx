// sections/Children/ChildrenCreator.tsx
import { useMutation } from "convex/react";
import { ChildrenForm } from "../../../Forms/ChildrenForm";
import { useNavigate } from "react-router";
import { api } from "../../../convex/_generated/api";
import type { CreateChildData } from "../../../convex/children/types";

export default function ChildrenCreator() {
  const navigate = useNavigate();
  const createChild = useMutation(api.children.mutations.createChild);

  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Explorador</h1>

<ChildrenForm
        onSubmit={async (data) => {
           if (!data.groupId) {
              alert("Debes seleccionar un grupo para el explorador.");
              return;
            }
           const createData: CreateChildData = {
             name: data.name,
             dni: data.dni,
             groupId: data.groupId,
           };
           try {
             await createChild(createData);
             navigate("/chicos");
           } catch (error) {
             console.error("No se pudo crear el explorador:", error);
             alert("No se pudo crear el explorador.");
           }
         }}
      />
    </div>
  );
}