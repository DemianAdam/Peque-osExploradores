import { Modal } from "../UI/Modal";

interface FullPayslip {
  _id: string;
  periodo: string;
  fecha_inicio: string;
  fecha_cierre: string;
  total_recaudado: number;
  total_gastos: number;
  id_seño: string;
  porcentaje_socio: number;
}

interface PayslipsDetailModalProps {
  payslip: FullPayslip;
  isOpen: boolean;
  onClose: () => void;
}

export function PayslipsDetailModal({ payslip, isOpen, onClose }: PayslipsDetailModalProps) {


  return (
    <Modal 
      title={<span className="text-orange-500 font-bold">Liquidación: {payslip.periodo}</span>} 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <div className="flex flex-col gap-4">

        {/* Tarjeta de información general de la liquidación */}
        <div className="bg-gray-50 border rounded-xl p-4 flex flex-col gap-3 text-sm text-slate-700">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Período:</span>
            <span className="font-bold text-slate-800">{payslip.periodo}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Fecha de Inicio:</span>
            <span className="font-medium text-slate-800">{payslip.fecha_inicio}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Fecha de Cierre:</span>
            <span className="font-medium text-slate-800">{payslip.fecha_cierre}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Total Recaudado:</span>
            <span className="font-bold text-emerald-600">${payslip.total_recaudado.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Total Gastos:</span>
            <span className="font-bold text-red-500">${payslip.total_gastos.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Porcentaje del Socio:</span>
            <span className="font-bold text-slate-800">{payslip.porcentaje_socio}%</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Seño Encargada:</span>
            <span className="font-medium text-slate-800">{payslip.id_seño}</span>
          </div>
        </div>



      </div>
    </Modal>
  );
}

export default PayslipsDetailModal;