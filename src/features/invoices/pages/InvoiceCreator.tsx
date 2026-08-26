
// src/features/invoices/pages/InvoiceCreator.tsx
import { InvoicesForm } from "@shared/forms/InvoicesForm";
import { useNavigate } from "react-router";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";


export default function InvoiceCreator() {
  const navigate = useNavigate();

  const createInvoice = useMutation(api.invoices.mutations.createInvoice);

  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Gasto</h1>

      <InvoicesForm
        onSubmit={async (data) => {
          try {
            await createInvoice(data);
            console.log("Datos del gasto a guardar:", data);
            navigate("/gastos");
          } catch (error) {
            console.error("No se pudo crear el gasto:", error);
            alert("No se pudo crear el gasto.");
          }
        }}
      />
    </div>
  );
}