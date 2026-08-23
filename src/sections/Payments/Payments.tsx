import { useNavigate } from "react-router";
import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { List } from "@/components/UI/List";
import { FullPayment } from "../../../convex/payments/types";
import { formatFeeLabel } from "../../common/labels";
import { PaymentDetailModal } from "@/components/Modals/PaymentDetailModal";
import { PaymentDeleteModal } from "@/components/Modals/PaymentDeleteModal";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { formatDate } from "../../common/dates";

export default function Payments() {
  const payments = useQuery(api.payments.queries.getPayments);
  const deletePaymentMutation = useMutation(api.payments.mutations.deletePayment);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<FullPayment | null>(null);
  const [paymentToDelete, setPaymentToDelete] = useState<FullPayment | null>(null);
  const navigate = useNavigate();
  const [isEditingMode, setIsEditingMode] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!paymentToDelete) return;

    try {
      await deletePaymentMutation({ id: paymentToDelete._id });
      setPaymentToDelete(null);
    } catch (error) {
      console.error("No se pudo eliminar el pago:", error);
    }
  };

  const filteredPayments = payments?.filter(payment => {
    const term = searchTerm.toLowerCase();
    return (
      payment.type.toLowerCase().includes(term) ||
      payment.fee.child.name.toLowerCase().includes(term) ||
      payment.teacher.name.toLowerCase().includes(term)
    );
  });

  const columns = [
    { header: "N°", accessor: (_: FullPayment, index: number) => index + 1 },
    {
      header: "Monto Pagado", accessor: (payment: FullPayment) => (
        <span className="font-bold text-emerald-600">
          ${payment.amount.toLocaleString()}
        </span>
      )
    },
    { header: "Cuota", accessor: (payment: FullPayment) => formatFeeLabel(payment.fee) },
    {
      header: "Tipo",
      accessor: (payment: FullPayment) => (
        <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-semibold uppercase">
          {payment.type === "cash" ? "Efectivo" : "Transferencia"}
        </span>
      )
    },
    {
      header: "Fecha", accessor: (payment: FullPayment) => formatDate(payment.date)
    },
    { header: "Seño", accessor: (payment: FullPayment) => payment.teacher.name },
    {
      header: "Acciones",
      accessor: (payment: FullPayment) => (
        <div className="flex gap-2">
          <button
            onClick={() => {
              setSelectedPayment(payment);
              setIsEditingMode(false);
            }}
            className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition"
            title="Ver detalle"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={() => {
              setSelectedPayment(payment);
              setIsEditingMode(true);
            }}
            className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition"
            title="Editar pago"
          >
            <Pencil size={18} />
          </button>

          <button
            onClick={() => setPaymentToDelete(payment)}
            className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
            title="Eliminar pago"
          >
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col p-8 px-6">
      <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">LISTA</h2>
      <h3 className="text-4xl font-bold text-blue-500 mb-8 drop-shadow-sm text-left">Pagos</h3>

      <List<FullPayment>
        data={filteredPayments}
        columns={columns}
        onSearch={setSearchTerm}
        searchPlaceholder="Buscar por tipo, alumno o seño..."
        onAdd={() => navigate("/pagos/nuevo")}
        buttonLabel=""
      />

      {selectedPayment && (
        <PaymentDetailModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
          initialEditing={isEditingMode}
        />
      )}

      {/* Modal de Eliminación */}
      <PaymentDeleteModal
        isOpen={!!paymentToDelete}
        onClose={() => setPaymentToDelete(null)}
        onConfirm={handleDeleteConfirm}
        label={paymentToDelete ? formatFeeLabel(paymentToDelete.fee) : ""}
      />
    </div>
  );
}