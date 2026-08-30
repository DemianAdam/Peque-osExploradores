import { Modal } from "@ui/Modal";
import { BaseInput } from "@ui/BaseInput";
import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

interface ClosePayslipModalProps {
  isOpen: boolean;
  onClose: (closedPayslip: boolean) => void;
}

export function ClosePayslipModal({
  isOpen,
  onClose,
}: ClosePayslipModalProps) {

  const closePayslip = useMutation(api.payslips.mutations.closePayslip);
  const feeConfiguration = useQuery(api.feeSettings.queries.getFeeSettings)?.partnerPercentage ?? 0;
  const currentPayslip = useQuery(api.payslips.queries.getCurrentPayslip);

  const [partnerPercentage, setPartnerPercentage] = useState(feeConfiguration);

  const handleClosePayslip = async () => {
    await closePayslip({ partnerPercentage });
    onClose(true);
  }

  const handleManualClose = () => {
    onClose(false);
  }


  return (
    <Modal
      isOpen={isOpen}
      onClose={handleManualClose}
      title={<span className="text-pink-500 font-bold">Resumen Cierre de Ciclo</span>}
    >
      <div className="flex flex-col gap-4">

        {/* Tarjeta con los datos fijos del cierre */}
        <div className="bg-gray-50 border rounded-xl p-4 flex flex-col gap-2.5 text-sm text-slate-700">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Período:</span>
            <span className="font-bold text-slate-800">{currentPayslip?.startedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Fecha de Inicio:</span>
            <span className="font-medium text-slate-800">{currentPayslip?.startedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Fecha de Cierre:</span>
            <span className="font-medium text-slate-800">{Date.now().toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Total Recaudado:</span>
            <span className="font-bold text-emerald-600">${currentPayslip?.payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Total Gastos:</span>
            <span className="font-bold text-red-500">${currentPayslip?.invoices.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Seño Encargada:</span>
            <span className="font-medium text-slate-800">{currentPayslip?.teacher._id}</span>
          </div>
        </div>

        {/* Único campo editable: Porcentaje del socio */}
        <BaseInput
          label="Porcentaje del Socio (%)"
          type="number"
          value={partnerPercentage}
          onChange={(e) => setPartnerPercentage(Number(e.target.value))}
        />

        <button
          onClick={handleClosePayslip}
          className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition shadow-md"
        >
          Confirmar Cierre y Liquidar
        </button>
      </div>
    </Modal>
  );
}

export default ClosePayslipModal;