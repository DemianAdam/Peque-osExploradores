import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { Invoice } from "../../../convex/invoices/types"; // Ajusta la ruta a tu tipo real
import { Modal } from "../UI/Modal";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface InvoiceDetailModalProps {
  invoice: Invoice;
  onClose: () => void;
  initialEditing?: boolean;
}

export function InvoiceDetailModal({ invoice, onClose, initialEditing = false }: InvoiceDetailModalProps) {
  const [isEditing, setIsEditing] = useState(initialEditing);
  const [description, setDescription] = useState(invoice.description);
  const [amount, setAmount] = useState(invoice.amount.toString());
  const allTeachers = useQuery(api.teachers.queries.getTeachers);
  const updateInvoice = useMutation(api.invoices.mutations.updateInvoice);
  const creatorTeacher = allTeachers?.find(t => t._id === invoice.teacherId);
  const formatDateForInput = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(formatDateForInput(invoice.date));

  const handleSave = async () => {
    const newDateTimestamp = date ? new Date(date).getTime() : invoice.date;
    await updateInvoice({
      id: invoice._id,
      description,
      amount: parseFloat(amount) || 0,
      date: newDateTimestamp,
    });
    setIsEditing(false);
  };

  return (
    <Modal title={isEditing ? (
        <span className="text-emerald-600 font-bold">Editar Gasto</span>
        ) : (
        <span className="text-pink-500 font-bold">Detalle del Gasto</span>
        )
        } 
        isOpen={!!invoice} 
        onClose={onClose}
    >
      <div className="flex flex-col gap-6">

        {/* Descripción del Gasto */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Descripción</label>
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500 rounded-xl p-4"}`}>
            {isEditing ? (
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-transparent outline-none font-bold text-slate-800"
              />
            ) : (
              <h2 className="text-xl font-bold text-slate-800">{description}</h2>
            )}
          </div>
        </div>

        {/* Monto y Fecha en dos columnas */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Monto</label>
            <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500 rounded-xl p-4"}`}>
              {isEditing ? (
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-transparent outline-none font-bold text-slate-800"
                />
              ) : (
                <p className="text-xl font-bold text-slate-800">${Number(amount).toFixed(2)}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-500">Fecha</label>
            <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500 rounded-xl p-4"}`}>
              {isEditing ? (
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-transparent outline-none font-medium text-slate-800 text-sm"
                />
              ) : (
                <p className="text-lg font-medium text-slate-800">
                  {new Date(invoice.date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Información adicional: Seño creadora y Liquidación */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-500">Información del Ciclo</label>

          <div className="bg-gray-50 border border-gray-500 rounded-xl p-4 space-y-3">
            <div>
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Seño que creó el gasto</span>
              <p className="font-semibold text-slate-700 mt-1">
                {creatorTeacher?.name ?? "Seño actual"}
              </p>
            </div>

            <div className="pt-2 border-t border-gray-200">
              <span className="text-xs font-semibold text-gray-400 block uppercase tracking-wider">Liquidación relacionada</span>
              <p className="font-medium text-slate-700 mt-1">
                {invoice.payslipId ? (
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                    Vinculado a liquidación
                  </span>
                ) : (
                  <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs font-semibold inline-block">
                    Sin liquidación (Ciclo abierto)
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Botón de Edición / Guardar */}
        <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold transition ${
                isEditing 
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" // <--- Verde fuerte y letra blanca
                : "bg-green-100 text-green-700 hover:bg-green-200"
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