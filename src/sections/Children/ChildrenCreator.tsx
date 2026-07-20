// sections/Children/ChildrenCreator.tsx
import { useMutation } from "convex/react";
import { ChildrenForm } from "../../components/Forms/ChildrenForm";
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
        onSubmit={(data) => {
          if (!data.groupId) {
            /*TODO KAREN: 
            Aca valido que se haya seleccionado un grupo, ya que de poder el usuario puede NO SELECCIONAR nada.
            Habria que dejarlo asi, que sale un alerta en el navegador, o habria que validarlo directamente den6tro de ChildrenForm
            Como veas que sea lo mejor para la UI
            */
            alert("Debes seleccionar un grupo para el explorador.");
            return;
          }
          const createData: CreateChildData = {
            name: data.name,
            dni: data.dni,
            groupId: data.groupId,
          };
          createChild(createData);
          navigate("/chicos");
        }}
      />
    </div>
  );
}