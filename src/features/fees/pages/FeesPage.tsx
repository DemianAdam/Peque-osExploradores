import { useState } from "react";
import { List } from "@ui/List";
import { CheckCircle2, Clock, AlertCircle, Search, Eye, DollarSign } from "lucide-react";

import { FeeDetailModal } from "@features/fees/components/FeeDetailModal";
import { useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { FullFee } from "@shared/types/convex";
import { ActivePeriodCard } from "../components/ActivePeriodCard";
import FeeCard from "../components/FeeCard";

export default function Fees() {
  const fees = useQuery(api.fees.queries.getFees);

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState<"all" | "pending" | "partial" | "paid">("all");

  // Estados para controlar los modales
  const [selectedFee, setSelectedFee] = useState<FullFee | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const activePeriod = fees && fees.length > 0 ? fees[0].startedAt : "Sin período activo";
  const activeFeeAmount = fees && fees.length > 0 ? fees[0].totalAmount : 0;
  const [editableFeeAmount, setEditableFeeAmount] = useState<number>(activeFeeAmount);
  
  
  const handleOpenDetail = (fee: FullFee) => {
    setSelectedFee(fee);
    setIsDetailModalOpen(true);
  };

  const handleOpenPay = (fee: { _id: string }) => {
    setSelectedFee(fee as FullFee);
    setIsDetailModalOpen(false);
    navigate(`/Pagos/Nuevo?feeId=${fee._id}`);
  };

  const filteredFees = fees?.filter(fee => {
    const matchesSearch = fee.child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.child.dni.includes(searchTerm);
    const matchesState = filterState === "all" || fee.state === filterState;
    return matchesSearch && matchesState;
  });

  const columns = [
    { header: "N°", accessor: (_: FullFee, index: number) => index + 1 },
    { header: "Explorador", accessor: (fee: FullFee) => fee.child.name },
    { header: "DNI", accessor: (fee: FullFee) => fee.child.dni },
    { 
      header: "Periodo", 
      accessor: (fee: FullFee) => {
        // Si no tiene fecha de cierre, mostramos un badge destacado "En curso"
        if (!fee.closedAt) {
          return (
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              Desde {fee.startedAt} (En curso)
            </span>
          );
        }
        // Si ya está cerrado, muestra el rango normal
        return `${fee.startedAt} al ${fee.closedAt}`;
      }
    },
    { header: "Total", accessor: (fee: FullFee) => `$${fee.totalAmount.toLocaleString()}` },
    { header: "Pagado", accessor: (fee: FullFee) => `$${fee.paidAmount.toLocaleString()}` },
    {
      header: "Estado",
      accessor: (fee: FullFee) => {
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
    },
    {
      header: "Acciones",
      accessor: (fee: FullFee) => {
        const isNotPaid = fee.state !== "paid";

        return (
          <div className="flex items-center gap-2">
            {/* Botón del Ojo para Ver Detalle (Historial de pagos) */}
            <button
              onClick={() => handleOpenDetail(fee)}
              className="p-1.5 bg-gray-100 hover:bg-blue-500 hover:text-white text-slate-600 rounded-lg transition-colors cursor-pointer shadow-2xs"
              title="Ver detalle e historial de pagos"
            >
              <Eye size={16} />
            </button>

            {/* Botón de Pagar condicional (solo si está pendiente o parcial) */}
            {isNotPaid && (
              <button
                onClick={() => handleOpenPay(fee)}
                className="px-2.5 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                title="Registrar pago"
              >
                <DollarSign size={14} />
                Pagar
              </button>
            )}
          </div>
        );
      }
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col p-8 px-6">
      <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">LISTA</h2>
      <h3 className="text-4xl font-bold text-blue-500 mb-6 drop-shadow-sm text-left">Cuotas</h3>

      <ActivePeriodCard 
        startedAt={activePeriod}
        feeAmount={editableFeeAmount || activeFeeAmount}
        onFeeChange={setEditableFeeAmount}
      />
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

      {/* 🖥️ ESCRITORIO: Renderiza la tabla oficial con la columna de Acciones */}
      <div className="hidden md:block">
        <List<FullFee>
          data={filteredFees}
          columns={columns}
          onSearch={setSearchTerm}
          searchPlaceholder="Buscar por explorador o DNI..."
        />
      </div>

      {/* 📱 MÓVIL: Renderiza el diseño de cards */}
      <div className="md:hidden flex flex-col gap-4">
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

        <div className="flex flex-col gap-3">
          {filteredFees?.map((fee: FullFee) => {
            // Creamos un objeto seguro donde adaptamos closedAt usando la misma lógica
            const safeFee = {
              ...fee,
              closedAt: fee.closedAt ? fee.closedAt : `(En curso)`, 
            };

            return (
              <FeeCard
                key={safeFee._id}
                fee={safeFee}
                onViewDetail={() => handleOpenDetail(fee)}
                onPay={() => handleOpenPay(fee)}
              />
            );
          })}
        </div>
      </div>

      {/* Modal de Detalle (Muestra el historial de pagos con sus fechas) */}
      <FeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onPay={handleOpenPay} 
        fee={selectedFee}
      />

    </div>
  );
}