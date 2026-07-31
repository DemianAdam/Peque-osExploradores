import { useState } from "react";
import { List } from "@/components/UI/List";
import { CheckCircle2, Clock} from "lucide-react";

// Tipado de prueba basado en tu validador de Convex
interface Fee {
  _id: string;
  startedAt: string;
  closedAt: string;
  totalAmount: number;
  state: "paid" | "pending";
  child: {
    _id: string;
    name: string;
  };
}

// Datos hardcodeados iniciales de prueba
const MOCK_FEES: Fee[] = [
  {
    _id: "1",
    startedAt: "01/07/2026",
    closedAt: "31/07/2026",
    totalAmount: 15000,
    state: "paid",
    child: { _id: "c1", name: "Mateo Gómez" },
  },
  {
    _id: "2",
    startedAt: "01/07/2026",
    closedAt: "31/07/2026",
    totalAmount: 15000,
    state: "pending",
    child: { _id: "c2", name: "Lucía Pérez" },
  },
  {
    _id: "3",
    startedAt: "01/07/2026",
    closedAt: "31/07/2026",
    totalAmount: 15000,
    state: "pending",
    child: { _id: "c3", name: "Joaquín Benítez" },
  },
];

export default function Fees() {
  const [fees, setFees] = useState<Fee[]>(MOCK_FEES);
  const [filterState, setFilterState] = useState<"all" | "paid" | "pending">("all");

  // Simula el cambio de estado de la cuota
  const handleToggleState = (feeId: string) => {
    setFees(prev =>
      prev.map(fee => {
        if (fee._id === feeId) {
          const nextState = fee.state === "paid" ? "pending" : "paid";
          return { ...fee, state: nextState };
        }
        return fee;
      })
    );
  };

  // Filtrado por buscador y estado
  const filteredFees = fees.filter(fee => {
    const matchesState = filterState === "all" || fee.state === filterState;
    return matchesState;
  });

  // Definición de columnas para el componente List
  const columns = [
    { header: "N°", accessor: (_: Fee, index: number) => index + 1 },
    { header: "Explorador", accessor: (fee: Fee) => fee.child.name },
    { header: "Inicio", accessor: (fee: Fee) => fee.startedAt },
    { header: "Vencimiento", accessor: (fee: Fee) => fee.closedAt },
    { header: "Monto", accessor: (fee: Fee) => `$${fee.totalAmount.toLocaleString()}` },
    {
      header: "Estado",
      accessor: (fee: Fee) => {
        const isPaid = fee.state === "paid";
        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
            isPaid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
          }`}>
            {isPaid ? <CheckCircle2 size={14} /> : <Clock size={14} />}
            {isPaid ? "Pagada" : "Pendiente"}
          </span>
        );
      }
    },
    {
      header: "Acciones",
      accessor: (fee: Fee) => {
        const isPaid = fee.state === "paid";
        return (
          <button
            onClick={() => handleToggleState(fee._id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition shadow-sm ${
              isPaid 
                ? "bg-amber-100 text-amber-800 hover:bg-amber-200" 
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            {isPaid ? "Marcar Pendiente" : "Marcar Pagada"}
          </button>
        );
      }
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col p-8 px-6">
      <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">LISTA</h2>
      <h3 className="text-4xl font-bold text-blue-500 mb-6 drop-shadow-sm text-left">Cuotas</h3>

      {/* Barra de Filtros por Estado*/}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        <div className="flex items-center bg-white border border-gray-200 p-1 rounded-xl text-sm font-semibold text-gray-600 shadow-sm self-start md:self-auto">
          <button
            onClick={() => setFilterState("all")}
            className={`px-4 py-1.5 rounded-lg transition ${filterState === "all" ? "bg-gray-100 text-slate-800 shadow-sm" : "hover:text-slate-800"}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterState("pending")}
            className={`px-4 py-1.5 rounded-lg transition ${filterState === "pending" ? "bg-amber-100 text-amber-800 shadow-sm" : "hover:text-slate-800"}`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilterState("paid")}
            className={`px-4 py-1.5 rounded-lg transition ${filterState === "paid" ? "bg-emerald-100 text-emerald-800 shadow-sm" : "hover:text-slate-800"}`}
          >
            Pagadas
          </button>
        </div>

      </div>

      {/* Componente List reutilizado */}
      <List<Fee>
        data={filteredFees}
        columns={columns}
        onSearch={() => {}} // Ya manejamos el filtro localmente arriba
      />
    </div>
  );
}