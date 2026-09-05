import { FullFee } from "@/shared/types/convex";
import { formatDateOnly, formatPeriod } from "@/shared/utils/dates";
import { Eye, DollarSign } from "lucide-react";


interface FeeCardProps {
  fee: FullFee;
  onViewDetail?: () => void;
  onPay?: () => void;
}

const stateConfig = {
  paid: { 
    label: "Pagada", 
    color: "bg-emerald-100 text-emerald-700", 
    borderLeft: "bg-emerald-500" 
  },
  partial: { 
    label: "Parcial", 
    color: "bg-blue-100 text-blue-700", 
    borderLeft: "bg-blue-500" 
  },
  pending: { 
    label: "Pendiente", 
    color: "bg-rose-100 text-rose-700", 
    borderLeft: "bg-rose-500" 
  },
};

export function FeeCard({ fee, onViewDetail, onPay }: FeeCardProps) {
  const current = stateConfig[fee.state] || stateConfig.pending;
  const isNotPaid = fee.state !== "paid";

  return (
    /* Contenedor tipo Card con relative y overflow-hidden para la barra lateral */
    <div className="relative bg-white p-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col gap-3">
      
      {/* Barra lateral dinámica según el estado */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${current.borderLeft}`} />

      {/* Cabecera de la card (pl-2 para que no pegue contra la barra lateral) */}
      <div className="flex justify-between items-center pl-2">
        <h4 className="font-bold text-slate-800 text-base">{fee.child.name}</h4>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${current.color}`}>
          {current.label}
        </span>
      </div>

      {/* DNI y Periodo */}
      <div className="text-xs text-gray-500 flex justify-between pl-2">
        <span>DNI: {fee.child.dni}</span>
        <span>Periodo: {formatPeriod(fee.payslip.startedAt)} al {fee.payslip.closedAt ? formatDateOnly(fee.payslip.closedAt) : "En curso"}</span>
      </div>

      <hr className="border-gray-100 my-0.5 ml-2" />

      {/* Bloque financiero */}
      <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center ml-2">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Total Cuota</span>
          <span className="text-sm font-bold text-slate-700">${fee.totalAmount.toLocaleString()}</span>
        </div>
        <div className="h-6 w-px bg-gray-200" />
        <div className="flex flex-col text-right">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Abonado</span>
          <span className="text-sm font-bold text-emerald-600">${fee.paidAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Botones de Acción Móvil (Ojo + Pagar) */}
      <div className="flex justify-end items-center gap-2 pt-1 pl-2">
        {/* Botón Ver Detalle */}
        <button
          onClick={onViewDetail}
           className="bg-blue-100 text-blue-600 p-2.5 rounded-full hover:bg-blue-200 transition"
        >
          <Eye size={18} />
        </button>

        {/* Botón Pagar Condicional */}
        {isNotPaid && (
          <button
            onClick={onPay}
            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <DollarSign size={14} />
            Pagar
          </button>
        )}
      </div>

    </div>
  );
}

export default FeeCard;