
import { useParams } from "react-router";
import { ChildrenForm } from "../../components/Forms/ChildrenForm";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";



export default function ChildrenEditor() {
  const { id } = useParams();
  
  
  const childData = useQuery(api.children.queries.getById, { id: id as any});
  const updateChild = useMutation(api.children.mutations.updateChild);
  if (!childData) return <div>Cargando...</div>;
  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Editando a {childData.name}</h1>
      
      {/* Aquí cargamos el formulario que creamos */}
      <ChildrenForm 
        initialData={childData} 
        onSubmit={(data) => {
            // Creamos una copia de los datos y eliminamos el 'id'
            const { id: _, ...dataToSend } = data; 
            
            // Enviamos el ID por separado y el resto de los campos como el objeto limpio
            updateChild({ 
                id: id as any, 
                ...dataToSend 
            });
            alert("¡Datos guardados!");
        }}
      />
    </div>
  );
}