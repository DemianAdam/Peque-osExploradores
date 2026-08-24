import { useState } from "react";
import { List } from "@/components/UI/List";
import { CheckCircle2, Clock, AlertCircle, Search } from "lucide-react";
import { FeeMobileCard } from "./FeeMobileCard";

interface Fee {
  _id: string;
  startedAt: string;
  closedAt: string;
  totalAmount: number;
  paidAmount: number;
  state: "pending" | "partial" | "paid";
  child: {
    _id: string;
    name: string;
    dni: string;
  };
}

const MOCK_FEES: Fee[] = [
  {
    _id: "1",
    startedAt: "01/07/2026",
    closedAt: "31/07/2026",
    totalAmount: 15000,
    paidAmount: 15000,
    state: "paid",
    child: { _id: "c1", name: "Mateo Gómez", dni: "45123456" },
  },
  {
    _id: "2",
    startedAt: "01/07/2026",
    closedAt: "31/07/2026",
    totalAmount: 15000,
    paidAmount: 5000,
    state: "partial",
    child: { _id: "c2", name: "Lucía Pérez", dni: "46789123" },
  },
  {
    _id: "3",
    startedAt: "01/07/2026",
    closedAt: "31/07/2026",
    totalAmount: 15000,
    paidAmount: 0,
    state: "pending",
    child: { _id: "c3", name: "Joaquín Benítez", dni: "45987321" },
  },
];

export default function Fees() {
  const [fees] = useState<Fee[]>(MOCK_FEES);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState<"all" | "pending" | "partial" | "paid">("all");

  const filteredFees = fees.filter(fee => {
    const matchesSearch = fee.child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          fee.child.dni.includes(searchTerm);
    const matchesState = filterState === "all" || fee.state === filterState;
    return matchesSearch && matchesState;
  });

  const columns = [
    { header: "N°", accessor: (_: Fee, index: number) => index + 1 },
    { header: "Explorador", accessor: (fee: Fee) => fee.child.name },
    { header: "DNI", accessor: (fee: Fee) => fee.child.dni },
    { header: "Periodo", accessor: (fee: Fee) => `${fee.startedAt} al ${fee.closedAt}` },
    { header: "Total", accessor: (fee: Fee) => `$${fee.totalAmount.toLocaleString()}` },
    { header: "Pagado", accessor: (fee: Fee) => `$${fee.paidAmount.toLocaleString()}` },
    {
      header: "Estado",
      accessor: (fee: Fee) => {
        const stateConfig = {
          paid: { label: "Pagada", color: "bg-emerald-100 text-emerald-700", icon: <CheckCircle2 size={14} /> },
          partial: { label: "Parcial", color: "bg-blue-100 text-blue-700", icon: <AlertCircle size={14} /> },
          pending: { label: "Pendiente", color: "bg-amber-100 text-amber-700", icon: <Clock size={14} /> },
        };

        const current = stateConfig[fee.state];

        return (
          <span className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${current.color}`}>
            {current.icon}
            {current.label}
          </span>
        );
      }
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col p-8 px-6">
      <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">INFORME</h2>
      <h3 className="text-4xl font-bold text-blue-500 mb-6 drop-shadow-sm text-left">Cuotas</h3>

      {/* Barra de Filtros por Estado */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-6">
        <div className="flex flex-wrap items-center bg-white border border-gray-200 p-1 rounded-xl text-sm font-semibold text-gray-600 shadow-sm self-start md:self-auto">
          <button
            onClick={() => setFilterState("all")}
            className={`px-3 py-1.5 rounded-lg transition ${filterState === "all" ? "bg-gray-100 text-slate-800 shadow-sm" : "hover:text-slate-800"}`}
          >
            Todas
          </button>
          <button
            onClick={() => setFilterState("pending")}
            className={`px-3 py-1.5 rounded-lg transition ${filterState === "pending" ? "bg-amber-100 text-amber-800 shadow-sm" : "hover:text-slate-800"}`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilterState("partial")}
            className={`px-3 py-1.5 rounded-lg transition ${filterState === "partial" ? "bg-blue-100 text-blue-800 shadow-sm" : "hover:text-slate-800"}`}
          >
            Parciales
          </button>
          <button
            onClick={() => setFilterState("paid")}
            className={`px-3 py-1.5 rounded-lg transition ${filterState === "paid" ? "bg-emerald-100 text-emerald-800 shadow-sm" : "hover:text-slate-800"}`}
          >
            Pagadas
          </button>
        </div>
      </div>

      {/* 🖥️ ESCRITORIO: Renderiza la tabla oficial de <List /> */}
      <div className="hidden md:block">
        <List<Fee>
          data={filteredFees}
          columns={columns}
          onSearch={setSearchTerm}
          searchPlaceholder="Buscar por explorador o DNI..."
        />
      </div>

      {/* 📱 MÓVIL: Renderiza el diseño de cards con FeeMobileCard */}
      <div className="md:hidden flex flex-col gap-4">
        {/* Buscador exclusivo para móvil */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text" 
            placeholder="Buscar por explorador o DNI..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 transition shadow-sm"
          />
        </div>

        {/* Listado de tarjetas móviles */}
        <div className="flex flex-col gap-3">
          {filteredFees.map((fee) => (
            <FeeMobileCard key={fee._id} fee={fee} />
          ))}
        </div>
      </div>
    </div>
  );
}