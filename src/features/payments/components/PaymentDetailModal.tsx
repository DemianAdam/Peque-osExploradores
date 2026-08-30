import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { Modal } from "@ui/Modal";
import { FullPayment } from "@shared/types/convex";
import { BaseSelect } from "@ui/BaseSelect";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";
import { formatDate, formatDateForInput, parseInputDate } from "@utils/dates";
import { formatFeeLabel } from "@utils/labels";



interface PaymentDetailModalProps {
  payment: FullPayment;
  onClose: () => void;
  initialEditing?: boolean;
}

export function PaymentDetailModal({ payment, onClose, initialEditing = false }: PaymentDetailModalProps) {
  const [isEditing, setIsEditing] = useState(initialEditing);
  
  const [formData, setFormData] = useState<{
    amount: number;
    date: number;
    type: "cash" | "transfer";
    feeId: string;
  }>({
    amount: payment.amount,
    date: payment.date,
    type: payment.type,
    feeId: payment.feeId,
  });

  const allFees = useQuery(api.fees.queries.getFees);
  const updatePayment = useMutation(api.payments.mutations.updatePayment);

  const formattedFees = allFees
    ?.filter((fee: any) => fee.state !== "paid" || fee._id === payment.feeId)
    .map((fee: any) => ({
      label: formatFeeLabel(fee),
      value: fee._id
    })) || [];

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
      newErrors.amount = "El monto debe ser mayor a 0.";
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

    try {
      await updatePayment({
        id: payment._id,
        amount: Number(formData.amount),
        date: formData.date,
        type: formData.type,
        feeId: formData.feeId,
      });
    } catch (error) {
      alert("No se pudo guardar el pago.");
      return;
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
                  value={formatDateForInput(formData.date)}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, date: parseInputDate(e.target.value) }));
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
                  className="w-full bg-transparent outline-none font-medium text-slate-800 text-sm"
                />
              ) : (
                <p className="text-sm font-medium text-slate-800 pt-1">
                  {formData.date ? formatDate(formData.date) : ""}
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
              <BaseSelect<string>
                label="Cuota"
                value={formData.feeId}
                onChange={(value: string) => setFormData({
                  ...formData,
                  feeId: value
                })}
                options={formattedFees}
                error={errors.feeId}
              />      
            ) : (
              <p className="text-sm font-medium text-slate-800">{formatFeeLabel(payment.fee)}</p>
            )}
          </div>
        </div>

        {/* Fila 2: Tipo de Pago y Seño (Grid de 2 columnas) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Tipo de Pago */}
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <BaseSelect<"cash" | "transfer">
                label="Tipo de Pago"
                value={formData.type}
                onChange={(type) => {
                  setFormData(prev => ({ ...prev, type }));
                  if (errors.type) setErrors({ ...errors, type: "" });
                }}
                options={[
                  { label: "Efectivo", value: "cash" },
                  { label: "Transferencia", value: "transfer" },
                ]}
                error={errors.type}
              />
            ) : (
              <>
                <label className="text-sm font-semibold text-gray-500">Tipo de Pago</label>
                <div className="border rounded-xl p-4 bg-gray-50 border border-gray-400">
                  <p className="text-sm font-bold text-slate-800 uppercase pt-0.5">
                    {formData.type === "cash" ? "Efectivo" : "Transferencia"}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Seño / Profesor (Fijo) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Seño (Creador)</label>
            <div className="border rounded-xl p-4 bg-gray-100 border-gray-300">
              <p className="text-sm font-medium text-slate-600 truncate pt-1.">
                {payment.teacher.name}
              </p>
            </div>
          </div>
        </div>

        {/* TODO KAREN: el pago tiene payslipId pero nunca se muestra; InvoiceDetailModal renderiza el badge 'Vinculado a liquidación'/'Sin liquidación' (InvoiceDetailModal.tsx:168-181). Replicar ese bloque acá cuando exista vinculación. */}

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
