
import { useParams } from "react-router";
import { ChildrenForm } from "../../components/Forms/ChildrenForm";
import { useMutation, useQuery } from "convex/react";
import { useNavigate } from "react-router";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";


export default function ChildrenEditor() {
  const { id } = useParams<{ id: Id<"children"> }>();
  const navigate = useNavigate();
  const childData = useQuery(api.children.queries.getById, { id: id! });
  const updateChild = useMutation(api.children.mutations.updateChild);
  if (!childData) return <div>Cargando...</div>;
  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Editando a {childData.name}</h1>

      <ChildrenForm 
        initialData={childData} 
        onSubmit={(data) => {
            updateChild({ id: id!, ...data });
            navigate("/chicos");
        }}
      />
    </div>
  );
}

