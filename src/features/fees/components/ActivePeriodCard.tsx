
import { Calendar, DollarSign } from "lucide-react";

interface ActivePeriodCardProps {
  startedAt: string;
  feeAmount: number;
  onFeeChange: (value: number) => void;
}

export function ActivePeriodCard({
  startedAt,
  feeAmount,
  onFeeChange,
}: ActivePeriodCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 text-blue-600 p-3.5 rounded-xl">
          <Calendar size={28} />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Período Abierto Actual
          </span>
          <h4 className="text-xl font-bold text-slate-800">
            Inicia el: <span className="text-blue-600">{startedAt}</span>
          </h4>
        </div>
      </div>

      <div className="w-full md:w-auto flex items-center gap-3 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl">
        <DollarSign className="text-slate-400" size={20} />
        <div className="flex flex-col">
          <label className="text-[11px] font-bold text-slate-400 uppercase">
            Valor de Cuota Establecido
          </label>
          <input
            type="number"
            value={feeAmount}
            onChange={(e) => onFeeChange(Number(e.target.value))}
            className="bg-transparent font-bold text-slate-800 text-base outline-none w-32 md:w-40 cursor-text"
          />
        </div>
      </div>
    </div>
  );
}