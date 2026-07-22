
import { InvoicesForm } from "@/components/Forms/InvoicesForm";
import { useNavigate } from "react-router";


export default function InvoicesCreator() {
  const navigate = useNavigate();
  
  // TODO: Demian, mutación para crear grupo
  // const createGroup = useMutation(api.groups.mutations.createGroup);

  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Gasto</h1>
      
      <InvoicesForm 
        onSubmit={(data) => {
            // TODO: Demian, ejecutar mutación: createInvoice(data);
            console.log("Datos del gasto a guardar:", data);
            navigate("/gastos");
        }} 
      />
    </div>
  );
}