import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { Modal } from "../UI/Modal";

interface Payment {
  _id: string;
  amount: number;
  date: string;
  type: "cash" | "transfer";
  feeId: string;
  teacherId: string;
  payslipId?: string | null;
}

interface PaymentDetailModalProps {
  payment: Payment;
  onClose: () => void;
  initialEditing?: boolean;
  onSave?: (updatedPayment: Payment) => void;
}

const AVAILABLE_FEES = [
  "Cuota 6 - Mateo Brito",
  "Cuota 7 - Lucía Pérez",
  "Cuota 8 - Sofía Gómez",
  "Cuota 9 - Lucas Benítez",
];

export function PaymentDetailModal({ payment, onClose, initialEditing = false, onSave }: PaymentDetailModalProps) {
  const [isEditing, setIsEditing] = useState(initialEditing);
  
  const [formData, setFormData] = useState({
    amount: payment.amount,
    date: payment.date,
    type: payment.type,
    feeId: payment.feeId,
    teacherId: payment.teacherId,
    payslipId: payment.payslipId ?? "",
  });

  const [errors, setErrors] = useState({
    amount: "",
    date: "",
    type: "",
    feeId: "",
  });

  const handleSave = async () => {
    const newErrors = { amount: "", date: "", type: "", feeId: "" };
    let isValid = true;

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = "El monto mayor a 0.";
      isValid = false;
    }

    if (!formData.date) {
      newErrors.date = "Obligatoria.";
      isValid = false;
    }

    if (!formData.type) {
      newErrors.type = "Obligatorio.";
      isValid = false;
    }

    if (!formData.feeId || !formData.feeId.trim()) {
      newErrors.feeId = "Obligatoria.";
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

    if (onSave) {
      onSave({
        ...payment,
        amount: Number(formData.amount),
        date: formData.date,
        type: formData.type,
        feeId: formData.feeId,
        teacherId: formData.teacherId,
      });
    }

    setIsEditing(false);
    onClose();
  };

  return (
    <Modal 
      title={
        isEditing ? (
          <span className="text-emerald-600 font-bold">Editar Pago</span>
        ) : (
          <span className="text-blue-500 font-bold">Detalle del Pago</span>
        )
      } 
      isOpen={!!payment} 
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">

        {/* Fila 1: Monto y Fecha  */}
        <div className="grid grid-cols-2 gap-4">
          {/* Monto */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Monto</label>
            <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-400"}`}>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, amount: Number(e.target.value) }));
                    if (errors.amount) setErrors({ ...errors, amount: "" });
                  }}
                  className="w-full bg-transparent outline-none font-bold text-slate-800 text-sm"
                />
              ) : (
                <p className="text-lg font-bold text-slate-800">${formData.amount.toLocaleString()}</p>
              )}
            </div>
            {isEditing && errors.amount && <span className="text-red-500 text-[10px] font-semibold ml-1">{errors.amount}</span>}
          </div>

          {/* Fecha */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Fecha</label>
            <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-400"}`}>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, date: e.target.value }));
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
                  className="w-full bg-transparent outline-none font-medium text-slate-800 text-sm"
                />
              ) : (
                <p className="text-sm font-medium text-slate-800 pt-1">
                  {formData.date ? new Date(formData.date + "T00:00:00").toLocaleDateString() : ""}
                </p>
              )}
            </div>
            {isEditing && errors.date && <span className="text-red-500 text-[10px] font-semibold ml-1">{errors.date}</span>}
          </div>
        </div>

        {/* Campo Cuota (Ancho completo porque el texto suele ser largo) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Cuota</label>
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-400"}`}>
            {isEditing ? (
              <select
                value={formData.feeId}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, feeId: e.target.value }));
                  if (errors.feeId) setErrors({ ...errors, feeId: "" });
                }}
                className="w-full bg-transparent outline-none font-bold text-slate-800 text-sm"
              >
                <option value="" disabled>Selecciona una cuota</option>
                {AVAILABLE_FEES.map((fee) => (
                  <option key={fee} value={fee}>{fee}</option>
                ))}
              </select>
            ) : (
              <p className="text-sm font-medium text-slate-800">{formData.feeId}</p>
            )}
          </div>
          {isEditing && errors.feeId && <span className="text-red-500 text-[10px] font-semibold ml-1">{errors.feeId}</span>}
        </div>

        {/* Fila 2: Tipo de Pago y Seño (Grid de 2 columnas) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tipo de Pago */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Tipo de Pago</label>
            <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-400"}`}>
              {isEditing ? (
                <select
                  value={formData.type}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, type: e.target.value as "cash" | "transfer" }));
                    if (errors.type) setErrors({ ...errors, type: "" });
                  }}
                  className="w-full bg-transparent outline-none font-bold text-slate-800 text-sm"
                >
                  <option value="cash">Efectivo</option>
                  <option value="transfer">Transferencia</option>
                </select>
              ) : (
                <p className="text-sm font-bold text-slate-800 uppercase pt-0.5">
                  {formData.type === "cash" ? "Efectivo" : "Transferencia"}
                </p>
              )}
            </div>
            {isEditing && errors.type && <span className="text-red-500 text-[10px] font-semibold ml-1">{errors.type}</span>}
          </div>

          {/* Seño / Profesor (Fijo) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Seño (Creador)</label>
            <div className="border rounded-xl p-4 bg-gray-100 border-gray-300">
              <p className="text-sm font-medium text-slate-600 truncate pt-1." title={formData.teacherId}>
                {formData.teacherId}
              </p>
            </div>
          </div>
        </div>

        {/* Botón de Acción */}
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold transition mt-2 ${
            isEditing 
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" 
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          {isEditing ? (
            <><Check size={16}/> Finalizar Edición</>
          ) : (
            <><Pencil size={16}/> Editar Pago</>
          )}
        </button>

      </div>
    </Modal>
  );
}