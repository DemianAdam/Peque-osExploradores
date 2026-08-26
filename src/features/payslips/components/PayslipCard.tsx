import { Eye, Calendar} from "lucide-react";

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

interface PayslipCardProps {
  payslip: FullPayslip;
  isLatest: boolean;
  onSelect: (payslip: FullPayslip) => void;
}

export function PayslipCard({ payslip, isLatest, onSelect }: PayslipCardProps) {
  
  return (
    <div 
      onClick={() => onSelect(payslip)}
      className={`relative bg-white p-5 rounded-3xl shadow-sm border transition-all active:scale-[0.98] cursor-pointer flex flex-col gap-4 ${
        isLatest ? "border-pink-400 ring-1 ring-pink-400/50" : "border-gray-100 hover:border-gray-200"
      }`}
    >
      {/* Cabecera de la Card: Período y Tag de "Última" o estado */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-pink-50 text-pink-600 p-2 rounded-2xl">
            <Calendar size={18} />
          </div>
          <div>
            <span className="text-xs text-gray-400 block font-medium">Período</span>
            <h4 className="text-base font-bold text-slate-800">{payslip.periodo}</h4>
          </div>
        </div>

        {isLatest && (
          <span className="bg-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-sm">
            Actual
          </span>
        )}
      </div>

      {/* Rango de fechas */}
      <div className="text-xs text-slate-500 bg-gray-50 px-3 py-1.5 rounded-xl flex items-center justify-between">
        <span>Desde: <strong className="text-slate-700">{payslip.fecha_inicio}</strong></span>
        <span>Hasta: <strong className="text-slate-700">{payslip.fecha_cierre}</strong></span>
      </div>

      {/* Métricas clave en minigrid */}
      <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-100">
        <div className="bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-100/60">
          <span className="text-[11px] text-emerald-600 font-medium block">Recaudado</span>
          <span className="text-sm font-bold text-emerald-700">${payslip.total_recaudado.toLocaleString()}</span>
        </div>

        <div className="bg-rose-50/50 p-2.5 rounded-2xl border border-rose-100/60">
          <span className="text-[11px] text-rose-600 font-medium block">Gastos</span>
          <span className="text-sm font-bold text-rose-700">${payslip.total_gastos.toLocaleString()}</span>
        </div>
      </div>

      {/* Pie de la Card: Porcentaje y botón detalle */}
      <div className="flex justify-between items-center pt-2">
        <div className="text-xs text-slate-500">
          Socio: <strong className="text-slate-800">{payslip.porcentaje_socio}%</strong>
        </div>

        <button 
          onClick={(e) => {
            e.stopPropagation(); // Evita que dispare doble evento con el div contenedor
            onSelect(payslip);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors"
        >
          <Eye size={15} />
        </button>
      </div>
    </div>
  );
}