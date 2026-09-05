
import { BaseInput } from "@/shared/ui/BaseInput";
import { Calendar, Check, Edit3, X } from "lucide-react";
import { useState } from "react";

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
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(feeAmount);

  const handleSave = () => {
    onFeeChange(tempValue);
    setIsEditing(false);
  };
  const handleCancel = () => {
    setTempValue(feeAmount);
    setIsEditing(false);
  };

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
            <span className="text-blue-600">{startedAt}</span>
          </h4>
        </div>
      </div>

      <div className="w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-4">
      {/* Input reutilizando BaseInput con estilos para ocultar flechas numéricas */}
        <div className="w-36 md:w-48">
          <BaseInput
            type="number"
            label="Valor de Cuota"
            value={isEditing ? tempValue : feeAmount}
            disabled={!isEditing}
            onChange={(e) => setTempValue(Number(e.target.value))}
            className={`w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-800 outline-none transition-all shadow-sm 
              [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]
              ${
                isEditing 
                  ? "bg-white border-blue-400 ring-2 ring-blue-50 cursor-text" 
                  : "cursor-default select-none opacity-80"
              }`}
          />
        </div>
      </div>
      {/* Botones de Editar / Guardar / Cancelar */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-1 shadow-sm"
              >
                <Check size={18} />
                Guardar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-200 hover:bg-gray-300 text-slate-600 px-3 py-3 rounded-xl transition flex items-center justify-center"
                title="Cancelar"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setTempValue(feeAmount); // Sincronizamos por las dudas
                setIsEditing(true);      // Activamos la edición
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 shadow-sm"
            >
              <Edit3 size={18} />
              Editar valor
            </button>
          )}
        </div>
    </div>
  );
}