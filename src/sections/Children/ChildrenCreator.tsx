// sections/Children/ChildrenCreator.tsx
import { useMutation } from "convex/react";
import { ChildrenForm } from "../../components/Forms/ChildrenForm";
import { useNavigate } from "react-router";
import { api } from "../../../convex/_generated/api";

export default function ChildrenCreator() {
  const navigate = useNavigate();
  // Usa la mutación de crear que seguro ya tienes, o agrégala:
  const createChild = useMutation(api.children.mutations.createChild); 

  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Explorador</h1>
      
      <ChildrenForm 
        onSubmit={(data) => {
            const { active, ...dataToSend } = data;
            createChild(dataToSend);
            navigate("/chicos");
        }} 
      />
    </div>
  );
}