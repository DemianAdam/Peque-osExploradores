
import { useMutation } from "convex/react";
import { GroupForm } from "../../components/Forms/GroupForm";
import { useNavigate } from "react-router";
import { api } from "../../../convex/_generated/api";


export default function GroupCreator() {
  const navigate = useNavigate();
  const createGroupWithTeachers = useMutation(api.groups.mutations.createGroupWithTeachers);

  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Grupo</h1>
      <GroupForm
        onSubmit={async (data) => {
          //TODO KAREN: Loading...
          await createGroupWithTeachers(data);
          console.log("Datos del grupo a guardar:", data);
          navigate("/grupos");
        }}
      />
    </div>
  );
}