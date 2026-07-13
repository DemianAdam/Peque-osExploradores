
import { GroupForm } from "../../components/Forms/GroupForm";
import { useNavigate } from "react-router";


export default function GroupCreator() {
  const navigate = useNavigate();
  
  // TODO: Demian, mutación para crear grupo
  // const createGroup = useMutation(api.groups.mutations.createGroup);

  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Grupo</h1>
      
      <GroupForm 
        onSubmit={(data) => {
            // TODO: Demian, ejecutar mutación: createGroup(data);
            console.log("Datos del grupo a guardar:", data);
            navigate("/grupos");
        }} 
      />
    </div>
  );
}