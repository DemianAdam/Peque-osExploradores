import { api } from "@convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";

interface PayslipFeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PayslipFeeModal({ isOpen, onClose }: PayslipFeeModalProps) {
  const previousFee = useQuery(api.feeSettings.queries.getFeeSettings)?.feeAmount ?? 0;
  const [option, setOption] = useState<"same" | "update">("same");
  const [newFee, setNewFee] = useState<number>(previousFee);

  const updateFee = useMutation(api.feeSettings.mutations.updateFeeSettings);

  const handleConfirm = async () => {
    updateFee({ feeAmount: newFee });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl flex flex-col gap-4">
        <h3 className="text-2xl font-bold text-slate-800">Definir cuota próximo mes</h3>
        <p className="text-sm text-slate-600">
          El período anterior ha finalizado con éxito. Ahora debes establecer el valor de la cuota para el nuevo período.
        </p>

        <div className="flex flex-col gap-3 mt-2">
          {/* Opción 1: Mantener la misma */}
          <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition ${option === "same" ? "border-pink-500 bg-pink-50/50" : "border-gray-200"}`}>
            <input
              type="radio"
              name="feeOption"
              checked={option === "same"}
              onChange={(e) => {
                setOption("same");
                setNewFee(previousFee);
              }}
              className="accent-pink-500"
            />
            <div className="text-sm">
              <span className="font-bold block text-slate-800">Mantener la misma del periodo anterior</span>
              <span className="text-slate-500">${previousFee.toLocaleString()}</span>
            </div>
          </label>

          {/* Opción 2: Actualizar / Modificar */}
          <label className={`flex flex-col gap-2 p-3 rounded-xl border cursor-pointer transition ${option === "update" ? "border-pink-500 bg-pink-50/50" : "border-gray-200"}`}>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="feeOption"
                checked={option === "update"}
                onChange={(e) => {
                  setOption("update");
                }}
                className="accent-pink-500"
              />
              <span className="font-bold text-sm text-slate-800">Actualizar valor para el próximo período</span>
            </div>

            {option === "update" && (
              <div className="mt-2 pl-6">
                <input
                  type="number"
                  value={newFee}
                  onChange={(e) => setNewFee(Number(e.target.value))}
                  className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-pink-500"
                  placeholder="Nuevo monto..."
                />
              </div>
            )}
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-bold text-slate-600 hover:bg-gray-100 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-pink-500 hover:bg-pink-600 text-white shadow-md transition"
          >
            Finalizar y Aplicar
          </button>
        </div>
      </div>
    </div >
  );
}