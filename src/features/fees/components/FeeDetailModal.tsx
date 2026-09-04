import { X, CheckCircle2, Clock, AlertCircle, Calendar, DollarSign } from "lucide-react";
import { FullFee } from "@shared/types/convex";
import { formatPeriod, formatDateOnly } from "@utils/dates";

interface FeeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay?: (fee: FullFee) => void;
  fee: FullFee | null;
}

export function FeeDetailModal({ isOpen, onClose, onPay, fee }: FeeDetailModalProps) {
  if (!isOpen || !fee) return null;

  const stateConfig = {
    paid: { label: "Pagada", color: "bg-emerald-100 text-emerald-700", icon: <CheckCircle2 size={16} /> },
    partial: { label: "Pago Parcial", color: "bg-blue-100 text-blue-700", icon: <AlertCircle size={16} /> },
    pending: { label: "Pendiente", color: "bg-amber-100 text-amber-700", icon: <Clock size={16} /> },
  } as const;

  const current = stateConfig[fee.state];
  const pendingAmount = fee.totalAmount - fee.paidAmount;
  const isNotPaid = fee.state !== "paid";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Cabecera del Modal */}
        <div className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">Detalle de Cuota</h3>
            <span className="text-xs text-slate-400">Período: {formatPeriod(fee.payslip.startedAt)} al {fee.payslip.closedAt ? formatDateOnly(fee.payslip.closedAt) : "En curso"}</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 flex flex-col gap-6 max-h-[80vh] overflow-y-auto">
          
          {/* Información del Explorador */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col gap-2">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Datos del Alumno</span>
            <div className="flex justify-between items-center">
              <span className="text-base font-bold text-slate-800">{fee.child.name}</span>
              <span className="text-xs bg-gray-200 text-gray-700 px-2.5 py-1 rounded-md font-medium">
                DNI: {fee.child.dni}
              </span>
            </div>
          </div>

          {/* Resumen Financiero y Estado */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50/60 border border-blue-100 p-3 rounded-xl text-center">
              <span className="text-[10px] text-blue-600 font-bold block">TOTAL CUOTA</span>
              <span className="text-sm font-bold text-slate-800">${fee.totalAmount.toLocaleString()}</span>
            </div>
            <div className="bg-emerald-50/60 border border-emerald-100 p-3 rounded-xl text-center">
              <span className="text-[10px] text-emerald-600 font-bold block">PAGADO</span>
              <span className="text-sm font-bold text-emerald-700">${fee.paidAmount.toLocaleString()}</span>
            </div>
            <div className="bg-amber-50/60 border border-amber-100 p-3 rounded-xl text-center">
              <span className="text-[10px] text-amber-600 font-bold block">PENDIENTE</span>
              <span className="text-sm font-bold text-amber-700">${pendingAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Estado actual */}
          <div className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
            <span className="text-xs font-semibold text-slate-600">Estado general:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${current.color}`}>
              {current.icon}
              {current.label}
            </span>
          </div>

          {/* Historial de Pagos Efectuados */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar size={14} className="text-blue-500" />
              Historial de Pagos Registrados
            </h4>

            {/* TODO: Mapear con la subcolección o array real de pagos asociados a esta cuota en Convex */}
            {fee.payments && fee.payments.length > 0 ? (
              <div className="flex flex-col gap-2">
                {fee.payments.map((payment: any, index: number) => (
                  <div 
                    key={payment._id || index}
                    className="bg-white border border-gray-200 p-3 rounded-xl flex justify-between items-center shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                        #{index + 1}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">Fecha: {formatDateOnly(payment.date)}</span>
                        <span className="text-[10px] text-gray-400">Método: {payment.type || "Efectivo/Transferencia"}</span>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 flex items-center">
                      <DollarSign size={14} />
                      {payment.amount.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-200 p-4 rounded-xl text-center">
                <p className="text-xs text-gray-400 italic">No se registraron pagos parciales para esta cuota todavía.</p>
              </div>
            )}
          </div>

        </div>

        {/* Pie del Modal con Acción de Pagar (Redirige al PaymentCreator sin cerrar a la fuerza el detalle) */}
        <div className="bg-gray-50 px-6 py-3.5 border-t border-gray-100 flex justify-center items-center">
          {isNotPaid ? (
            <button
              onClick={() => {
                if (onPay) onPay(fee); // Dispara handleOpenPay (cierra detalle y abre PaymentCreator)
              }}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <DollarSign size={14} />
              Pagar Cuota
            </button>
          ) : (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-100">
              Cuota Completada ✔
            </span>
          )}
        </div>

      </div>
    </div>
  );
}