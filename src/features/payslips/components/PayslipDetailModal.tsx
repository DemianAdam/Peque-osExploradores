import { Trash2 } from "lucide-react";
import { Modal } from "@ui/Modal";
import { FullPayslip } from "@convex/payslips";



interface PayslipDetailModalProps {
  payslip: FullPayslip;
  isOpen: boolean;
  onClose: () => void;
  onOpenDeleteModal?: () => void; // Función para disparar el modal de eliminación específico
}

export function PayslipDetailModal({ payslip, isOpen, onClose, onOpenDeleteModal }: PayslipDetailModalProps) {
  return (
    <Modal 
    //TODO KAREN: formatear periodo
      title={<span className="text-pink-500 font-bold">Liquidación: {payslip.startedAt}</span>} 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">

        {/* Tarjeta de información general */}
        <div className="bg-gray-50 border rounded-xl p-4 flex flex-col gap-3 text-sm text-slate-700">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Período:</span>
            //TODO KAREN: formatear periodo
            <span className="font-bold text-slate-800">{payslip.startedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Fecha de Inicio:</span>
            <span className="font-medium text-slate-800">{payslip.startedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Fecha de Cierre:</span>
            <span className="font-medium text-slate-800">{payslip.closedAt}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Total Recaudado:</span>
            <span className="font-bold text-emerald-600">${payslip.payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Total Gastos:</span>
            <span className="font-bold text-red-500">${payslip.invoices.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Porcentaje del Socio:</span>
            <span className="font-bold text-slate-800">{payslip.partnerPercentage}%</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Seño Encargada:</span>
            <span className="font-medium text-slate-800">{payslip.teacherId}</span>
          </div>
        </div>

        {/* Botón de Eliminar: Solo aparece si onOpenDeleteModal está definido (es la última) */}
        {onOpenDeleteModal && (
          <button
            onClick={() => {
              onOpenDeleteModal();
            }}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-red-100 text-red-600 hover:bg-red-200 transition"
          >
            <Trash2 size={16} /> Eliminar Liquidación
          </button>
        )}

      </div>
    </Modal>
  );
}

