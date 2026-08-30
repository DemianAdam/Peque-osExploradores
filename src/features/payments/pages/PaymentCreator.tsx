// src/features/payments/pages/PaymentCreator.tsx
import { PaymentForm } from "@shared/forms/PaymentForm";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function PaymentCreator() {
  const navigate = useNavigate();
  const createPayment = useMutation(api.payments.mutations.createPayment);
  const [searchParams] = useSearchParams();
  const urlFeeId = searchParams.get("feeId");

  const fee = useQuery(api.fees.queries.getFeeById, urlFeeId? { feeId: urlFeeId  } : "skip");


  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Pago</h1>
      <div>{fee?.totalAmount}</div>
      <PaymentForm
        onSubmit={async ({ feeId, ...rest }) => {
          if (!feeId) return;
          try {
            await createPayment({ ...rest, feeId });
            navigate("/pagos");
          } catch (error) {
            alert("No se pudo crear el pago.");
          }
        }}
      />
    </div>
  );
}
