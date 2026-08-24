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

interface PayslipsCalendarViewProps {
  payslips: FullPayslip[];
  onSelect: (payslip: FullPayslip) => void;
}

export function PayslipsCalendarView({ payslips, onSelect }: PayslipsCalendarViewProps) {
  return (
    <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
      {payslips.map((payslip, index) => {
        const isLatest = index === 0;
        const neto = payslip.total_recaudado - payslip.total_gastos;

        return (
          <div
            key={payslip._id}
            onClick={() => onSelect(payslip)}
            className={`bg-white p-2 sm:p-4 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 relative active:scale-95 ${
              isLatest 
                ? "border-pink-500 ring-1 sm:ring-2 ring-pink-400/20 shadow-md bg-gradient-to-b from-pink-50/30 to-white" 
                : "border-gray-100 shadow-sm hover:border-gray-200"
            }`}
          >
            {/* Cabecera del "Bloque Mes" */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className={`w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-[10px] sm:text-xs uppercase shrink-0 ${
                  isLatest ? "bg-pink-500 text-white" : "bg-slate-100 text-slate-700"
                }`}>
                  {payslip.periodo.slice(0, 3)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-slate-800 text-[11px] sm:text-sm truncate">{payslip.periodo}</h4>
                  <span className="text-[9px] sm:text-[10px] text-gray-400 truncate block">Socio: {payslip.porcentaje_socio}%</span>
                </div>
              </div>

              {isLatest && (
                <span className="bg-pink-100 text-pink-600 text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider self-start sm:self-center">
                  Activa
                </span>
              )}
            </div>

            <hr className="border-gray-100 my-0.5" />

            {/* Métricas financieras: en formato columna vertical en celular para que no se pisen los números, y en 3 columnas en PC */}
            <div className="bg-gray-50 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl flex flex-col sm:grid sm:grid-cols-3 gap-1 text-left sm:text-center">
              <div>
                <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-gray-400 font-bold block">Ingresos</span>
                <span className="text-[10px] sm:text-xs font-bold text-emerald-600 truncate block">${payslip.total_recaudado.toLocaleString()}</span>
              </div>
              <div className="sm:border-x sm:border-gray-200 pt-1 sm:pt-0 border-t border-gray-200/60 sm:border-t-0">
                <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-gray-400 font-bold block">Gastos</span>
                <span className="text-[10px] sm:text-xs font-bold text-rose-500 truncate block">${payslip.total_gastos.toLocaleString()}</span>
              </div>
              <div className="pt-1 sm:pt-0 border-t border-gray-200/60 sm:border-t-0">
                <span className="text-[7px] sm:text-[8px] uppercase tracking-wider text-gray-400 font-bold block">Neto</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-700 truncate block">${neto.toLocaleString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PayslipsCalendarView;