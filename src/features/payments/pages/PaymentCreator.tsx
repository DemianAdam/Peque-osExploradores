
import { PaymentForm } from "@shared/forms/PaymentForm";
import { useNavigate, useSearchParams } from "react-router";
import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export default function PaymentCreator() {
  const navigate = useNavigate();
  const createPayment = useMutation(api.payments.mutations.createPayment);
  const [searchParams] = useSearchParams();
  const urlFeeId = searchParams.get("feeId");

  // Consultamos la cuota específica si viene el ID por URL
  const fee = useQuery(api.fees.queries.getFeeById, urlFeeId ? { feeId: urlFeeId } : "skip");

  // 🧮 LÓGICA DE CÁLCULO:
  // Si la cuota existe, calculamos cuánto falta por pagar:
  // - Si es pendiente: totalAmount
  // - Si es parcial: totalAmount - paidAmount
  const remainingAmount = fee ? fee.totalAmount - fee.paidAmount : 0;

  return (
    <div className="p-10 bg-[#C6E5D9] min-h-screen">
      <h1 className="text-3xl font-bold mb-5">Nuevo Pago</h1>
      
      {/* Opcional: Un pequeño aviso visual de la cuota que se está cobrando */}
      {fee && (
        <div className="mb-4 bg-white/80 p-4 rounded-xl shadow-sm text-sm text-slate-700 flex justify-between items-center max-w-xl">
          <div>
            <span className="font-bold block">Explorador: {fee.child?.name}</span>
            <span className="text-xs text-slate-500">Período: Desde {fee.startedAt}</span>
          </div>
          <div className="text-right">
            <span className="block text-xs text-slate-500">Saldo pendiente a cubrir:</span>
            <span className="font-bold text-emerald-600 text-base">${remainingAmount.toLocaleString()}</span>
          </div>
        </div>
      )}

      <PaymentForm
        // Pasamos por props iniciales al formulario la cuota preseleccionada y el monto calculado
        initialFeeId={urlFeeId || undefined}
        initialAmount={remainingAmount > 0 ? remainingAmount : undefined}
        onSubmit={async ({ feeId, ...rest }) => {
          if (!feeId) return;
          try {
            await createPayment({ ...rest, feeId });
            navigate("/pagos");
          } catch {
            alert("No se pudo crear el pago.");
          }
        }}
      />
    </div>
  );
}