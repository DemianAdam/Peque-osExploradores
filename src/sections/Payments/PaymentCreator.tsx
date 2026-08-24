import { PaymentForm } from "@/components/Forms/PaymentForm";
import { useNavigate } from "react-router";
import { api } from "../../../convex/_generated/api";
import { useMutation } from "convex/react";

export default function PaymentCreator() {
  const navigate = useNavigate();
  const createPayment = useMutation(api.payments.mutations.createPayment);
  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Pago</h1>

      <PaymentForm
        onSubmit={async ({ feeId, ...rest }) => {
          // TODO KAREN: createPayment puede ser rechazado por el servidor (monto mayor al restante, cuota ya pagada) y hoy el error es invisible para el usuario. Agregar try/catch con feedback en la UI.
          if (!feeId) return;
          await createPayment({ ...rest, feeId });
          navigate("/pagos");
        }}
      />
    </div>
  );
}
