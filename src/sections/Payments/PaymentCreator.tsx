import { PaymentForm } from "../../../Forms/PaymentForm";
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
          if (!feeId) return;
          try {
            await createPayment({ ...rest, feeId });
            navigate("/pagos");
          } catch (error) {
            console.error("No se pudo crear el pago:", error);
            alert("No se pudo crear el pago.");
          }
        }}
      />
    </div>
  );
}
