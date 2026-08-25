import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { Invoice } from "../../../convex/invoices/types";
import { Modal } from "../UI/Modal";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { formatDate, formatDateForInput, parseInputDate } from "../../common/dates";

interface InvoiceModalProps {
  invoice: Invoice;
  onClose: () => void;
  initialEditing?: boolean;
}

export function InvoiceDetailModal({ invoice, onClose, initialEditing = false }: InvoiceModalProps) {
  const [isEditing, setIsEditing] = useState(initialEditing);

  // Estado único para los campos del formulario
  const [formData, setFormData] = useState({
    description: invoice.description,
    amount: invoice.amount.toString(),
    date: formatDateForInput(invoice.date),
  });

  

  // Estados de errores por campo
  const [errors, setErrors] = useState({
    description: "",
    amount: "",
    date: "",
  });

  const allTeachers = useQuery(api.teachers.queries.getTeachers);
  const updateInvoice = useMutation(api.invoices.mutations.updateInvoice);

  const creatorTeacher = allTeachers?.find(t => t._id === invoice.teacherId);

  const handleSave = async () => {
    const newDateTimestamp = formData.date ? parseInputDate(formData.date) : invoice.date;

    const newErrors = { description: "", amount: "", date: "" };
    let isValid = true;

    if (!formData.description || !formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria.";
      isValid = false;
    }

    if (!formData.amount || !formData.amount.trim()) {
      newErrors.amount = "El monto es obligatorio.";
      isValid = false;
    }
    if (!formData.date || !formData.date.trim()) {
      newErrors.date = "La fecha es obligatoria.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    try {
      await updateInvoice({
        id: invoice._id,
        description: formData.description,
        amount: parseFloat(formData.amount) || 0,
        date: newDateTimestamp,
      });
    } catch (error) {
      console.error("No se pudo guardar el gasto:", error);
      alert("No se pudo guardar el gasto.");
      return;
    }
    setIsEditing(false); // Vuelve al modo detalle al guardar
  };

  return (
    <Modal 
      title={
        isEditing ? (
          <span className="text-emerald-600 font-bold">Editar Gasto</span>
        ) : (
          <span className="text-orange-500 font-bold">Detalle del Gasto</span>
        )
      } 
      isOpen={!!invoice} 
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">

        {/* Descripción */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Descripción</label>
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500"}`}>
            {isEditing ? (
              <input
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description) setErrors({ ...errors, description: "" });
                }}
                className="w-full bg-transparent outline-none font-bold text-slate-800"
              />
            ) : (
              <h2 className="text-xl font-bold text-slate-800">{formData.description}</h2>
            )}
          </div>
          {isEditing && errors.description && (
            <span className="text-red-500 text-xs font-semibold ml-1">{errors.description}</span>
          )}
        </div>

        {/* Monto y Fecha */}
        <div className="grid grid-cols-2 gap-4">
          
          {/* Monto */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Monto</label>
            <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500"}`}>
              {isEditing ? (
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => {
                    setFormData({ ...formData, amount: e.target.value });
                    if (errors.amount) setErrors({ ...errors, amount: "" });
                  }}
                  className="w-full bg-transparent outline-none font-bold text-slate-800"
                />
              ) : (
                <p className="text-lg font-bold text-orange-600">${Number(formData.amount).toFixed(2)}</p>
              )}
            </div>
            {isEditing && errors.amount && (
              <span className="text-red-500 text-xs font-semibold ml-1">{errors.amount}</span>
            )}
          </div>

          {/* Fecha */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Fecha</label>
            <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500"}`}>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => {
                    setFormData({ ...formData, date: e.target.value });
                    if (errors.date) setErrors({ ...errors, date: "" });
                  }}
                  className="w-full bg-transparent outline-none font-medium text-slate-800 text-sm"
                />
              ) : (
                <p className="text-lg font-medium text-slate-800">
                  {formatDate(invoice.date)}
                </p>
              )}
            </div>
            {isEditing && errors.date && (
              <span className="text-red-500 text-xs font-semibold ml-1">{errors.date}</span>
            )}
          </div>
        </div>

        {/* Información del Ciclo */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-500">Información del Ciclo</label>
          <div className="bg-gray-50 border border-gray-500 rounded-xl p-4 space-y-3">
            <div>
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Seño que creó el gasto</span>
              <p className="font-semibold text-slate-700 mt-1">{creatorTeacher?.name ?? "Seño actual"}</p>
            </div>
            <div className="pt-2 border-t border-gray-200">
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Liquidación relacionada</span>
              <p className="font-medium text-slate-700 mt-1">
                {invoice.payslipId ? (
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                    Vinculado a liquidación
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                    Sin liquidación (Ciclo abierto)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Botón de Acción */}
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold transition ${
            isEditing 
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" 
              : "bg-orange-100 text-orange-700 hover:bg-orange-200"
          }`}
        >
          {isEditing ? (
            <><Check size={16}/> Finalizar Edición</>
          ) : (
            <><Pencil size={16}/> Editar Gasto</>
          )}
        </button>

      </div>
    </Modal>
  );
}