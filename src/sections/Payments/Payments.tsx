import { useNavigate } from "react-router";
import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { List } from "@/components/UI/List";
import { PaymentDetailModal } from "@/components/Modals/PaymentDetailModal";
import { PaymentDeleteModal } from "@/components/Modals/PaymentDeleteModal";

interface Payment {
  _id: string;
  amount: number;
  date: string;
  type: "cash" | "transfer";
  feeId: string;
  teacherId: string;
  payslipId?: string | null;
}

// MOCK data inicial para que tu socio lo vea andando de inmediato
const MOCK_PAYMENTS: Payment[] = [
  {
    _id: "p1",
    amount: 15000,
    date: "2024-06-01",
    type: "transfer",
    feeId: "Cuota 6 - Mateo Brito",
    teacherId: "Karen Brite",
    payslipId: null,
  },
  {
    _id: "p2",
    amount: 5000,
    date: "2024-06-02",
    type: "cash",
    feeId: "Cuota 7 - Lucía Pérez",
    teacherId: "Ayelen Ponti",
    payslipId: null,
  },
];

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>(MOCK_PAYMENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [paymentToDelete, setPaymentToDelete] = useState<Payment | null>(null);
  const navigate = useNavigate();
  const [isEditingMode, setIsEditingMode] = useState(false);

  // Eliminación hardcodeada localmente (filtra el array sin llamar a Convex)
  const handleDeleteConfirm = async () => {
    if (!paymentToDelete) return;

    try {
      setPayments(prev => prev.filter(p => p._id !== paymentToDelete._id));
      setPaymentToDelete(null);
    } catch (error) {
      console.error("No se pudo eliminar el pago:", error);
    }
  };

  const filteredPayments = payments.filter(payment => {
    return (
      payment.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.feeId.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const columns = [
    { header: "N°", accessor: (_: Payment, index: number) => index + 1 },
    { header: "Monto Pagado", accessor: (payment: Payment) => (
        <span className="font-bold text-emerald-600">
          ${payment.amount.toLocaleString()}
        </span>
      ) 
    },
    { header: "ID Cuota", accessor: (payment: Payment) => payment.feeId },
    { 
      header: "Tipo", 
      accessor: (payment: Payment) => (
        <span className="px-2.5 py-1 bg-gray-100 rounded-full text-xs font-semibold uppercase">
          {payment.type === "cash" ? "Efectivo" : "Transferencia"}
        </span>
      ) 
    },
    { 
      header: "Fecha", accessor: (payment: Payment) => new Date(payment.date + "T00:00:00").toLocaleDateString() 
    },
    { header: "ID Seño", accessor: (payment: Payment) => payment.teacherId },
    {
      header: "Acciones", 
      accessor: (payment: Payment) => (
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

      <List<Payment>
        data={filteredPayments}
        columns={columns}
        onSearch={setSearchTerm}
        searchPlaceholder="Buscar por tipo o cuota..."
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
          feeId={paymentToDelete?.feeId ?? ""}
      />
    </div>
  );
}