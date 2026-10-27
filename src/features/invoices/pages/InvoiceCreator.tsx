
// src/features/invoices/pages/InvoiceCreator.tsx
import { InvoicesForm } from "@shared/forms/InvoicesForm";
import { useNavigate } from "react-router";
import { api } from "@convex/_generated/api";
import { useMutation } from "convex/react";


export default function InvoiceCreator() {
  const navigate = useNavigate();

  const createInvoice = useMutation(api.invoices.mutations.createInvoice);

  return (
    <div className="p-10 w-full">
      <h1 className="text-3xl font-bold mb-5">Nuevo Gasto</h1>

      <InvoicesForm
        onSubmit={async (data) => {
          try {
            await createInvoice(data);
            navigate("/gastos");
          } catch {
            alert("No se pudo crear el gasto.");
          }
        }}
      />
    </div>
  );
}