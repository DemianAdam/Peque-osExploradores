import { Modal } from "@ui/Modal";
import { BaseInput } from "@ui/BaseInput";
import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState, useMemo } from "react";
import { formatPeriod, formatDateOnly } from "@shared/utils/dates";

interface ClosePayslipModalProps {
  isOpen: boolean;
  onClose: (closedPayslip: boolean) => void;
}

export function ClosePayslipModal({
  isOpen,
  onClose,
}: ClosePayslipModalProps) {

  const closePayslip = useMutation(api.payslips.mutations.closePayslip);
  const createFirstPayslip = useMutation(api.payslips.mutations.createFirstPayslip);
  const feeConfiguration = useQuery(api.feeSettings.queries.getFeeSettings);
  const currentPayslip = useQuery(api.payslips.queries.getCurrentPayslip);

  const [partnerPercentage, setPartnerPercentage] = useState(feeConfiguration?.partnerPercentage ?? 0);
  const [feeAmount, setfeeAmount] = useState(feeConfiguration?.feeAmount ?? 0);

  const closeDate = useMemo(() => (isOpen ? new Date() : null), [isOpen]);

  const handleClosePayslip = async () => {
    if (currentPayslip) {
      await closePayslip({ partnerPercentage });
    }
    else {
      await createFirstPayslip({ partnerPercentage, feeAmountUsed: feeAmount })
    }

    onClose(true);
  }

  const handleManualClose = () => {
    onClose(false);
  }

  const totalSpent = useMemo(() => {
    if (!currentPayslip) return 0;
    return currentPayslip.invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  }, [currentPayslip]);

  const totalCollected = useMemo(() => {
    if (!currentPayslip) return 0;
    return currentPayslip.payments.reduce((sum, payment) => sum + payment.amount, 0);
  }, [currentPayslip]);

  const subtotal = useMemo(() => totalCollected - totalSpent, [totalCollected, totalSpent]);

  const totalPartner = useMemo(() => {
    if (!currentPayslip) return 0;
    return subtotal * (partnerPercentage / 100);
  }, [subtotal, partnerPercentage, currentPayslip]);

  const totalNet = useMemo(() => subtotal - totalPartner, [subtotal, totalPartner]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleManualClose}
      title={<span className="text-pink-500 font-bold">Resumen Cierre de Ciclo</span>}
    >
      <div className="flex flex-col gap-4">

        {/* Tarjeta con los datos fijos del cierre */}
        {currentPayslip &&
          <div className="bg-gray-50 border rounded-xl p-4 flex flex-col gap-2.5 text-sm text-slate-700">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Período:</span>
              <span className="font-bold text-slate-800">{currentPayslip?.startedAt ? formatPeriod(currentPayslip.startedAt) : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Fecha de Inicio:</span>
              <span className="font-medium text-slate-800">{currentPayslip?.startedAt ? formatDateOnly(currentPayslip.startedAt) : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Fecha de Cierre:</span>
              <span className="font-medium text-slate-800">{closeDate ? formatDateOnly(closeDate.getTime()) : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Total Recaudado:</span>
              <span className="font-bold text-emerald-700">${totalCollected.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Total Gastos:</span>
              <span className="font-bold text-red-500">${totalSpent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">SubTotal:</span>
              <span className="font-bold text-slate-800">${(totalCollected - totalSpent).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-500">Total Socio:</span>
              <span className="font-bold text-slate-800">${totalPartner.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700 text-2xl">Total Neto:</span>
              <span className="font-bold  text-2xl text-emerald-600 ">${totalNet.toLocaleString()}</span>
            </div>

          </div>
        }


        {/* Único campo editable: Porcentaje del socio */}
        <BaseInput
          label="Porcentaje del Socio (%)"
          type="number"
          value={partnerPercentage}
          onChange={(e) => setPartnerPercentage(Number(e.target.value))}
        />
        {
          !currentPayslip &&
          <BaseInput
            label="Valor de la cuota"
            type="number"
            value={feeAmount}
            onChange={(e) => setfeeAmount(Number(e.target.value))}
          />
        }

        <button
          onClick={handleClosePayslip}
          className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition shadow-md"
        >
          {currentPayslip ? "Confirmar Cierre y Liquidar" : "Iniciar"}
        </button>
      </div>
    </Modal>
  );
}

export default ClosePayslipModal;