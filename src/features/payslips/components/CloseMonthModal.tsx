import { Modal } from "@ui/Modal";
import { BaseInput } from "@ui/BaseInput";

interface CloseMonthFormState {
  periodo: string;
  fecha_inicio: string;
  fecha_cierre: string;
  total_recaudado: number;
  total_gastos: number;
  id_seño: string;
  porcentaje_socio: number;
}

interface CloseMonthModalProps {
  isOpen: boolean;
  onClose: () => void;
  closeForm: CloseMonthFormState;
  onChangeForm: (updatedForm: CloseMonthFormState) => void;
  onConfirm: () => void;
}

export function CloseMonthModal({
  isOpen,
  onClose,
  closeForm,
  onChangeForm,
  onConfirm,
}: CloseMonthModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={<span className="text-pink-500 font-bold">Resumen Cierre de Ciclo</span>}
    >
      <div className="flex flex-col gap-4">
        
        {/* Tarjeta con los datos fijos del cierre */}
        <div className="bg-gray-50 border rounded-xl p-4 flex flex-col gap-2.5 text-sm text-slate-700">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Período:</span>
            <span className="font-bold text-slate-800">{closeForm.periodo}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Fecha de Inicio:</span>
            <span className="font-medium text-slate-800">{closeForm.fecha_inicio}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Fecha de Cierre:</span>
            <span className="font-medium text-slate-800">{closeForm.fecha_cierre}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Total Recaudado:</span>
            <span className="font-bold text-emerald-600">${closeForm.total_recaudado.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Total Gastos:</span>
            <span className="font-bold text-red-500">${closeForm.total_gastos.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500">Seño Encargada:</span>
            <span className="font-medium text-slate-800">{closeForm.id_seño}</span>
          </div>
        </div>

        {/* Único campo editable: Porcentaje del socio */}
        <BaseInput
          label="Porcentaje del Socio (%)"
          type="number"
          value={closeForm.porcentaje_socio}
          onChange={(e) =>
            onChangeForm({
              ...closeForm,
              porcentaje_socio: Number(e.target.value),
            })
          }
        />

        <button
          onClick={onConfirm}
          className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition shadow-md"
        >
          Confirmar Cierre y Liquidar
        </button>
      </div>
    </Modal>
  );
}

export default CloseMonthModal;