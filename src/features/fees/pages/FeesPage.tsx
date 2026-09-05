import { useState } from "react";
import { List } from "@ui/List";
import { CheckCircle2, Clock, AlertCircle, Eye, DollarSign } from "lucide-react";
import { FeeDetailModal } from "@features/fees/components/FeeDetailModal";
import { FeesFilters } from "@features/fees/components/FeesFilters";
import { useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";
import { FullFee } from "@shared/types/convex";
import { ActivePeriodCard } from "../components/ActivePeriodCard";
import FeeCard from "../components/FeeCard";
import { formatPeriod, formatDateOnly } from "@utils/dates";

export default function Fees() {
  const fees = useQuery(api.fees.queries.getFees);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState<"all" | "pending" | "partial" | "paid">("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  const [selectedFee, setSelectedFee] = useState<FullFee | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const activePeriod = fees && fees.length > 0 ? formatPeriod(fees[0].payslip.startedAt) : "Sin período activo";
  const activeFeeAmount = fees && fees.length > 0 ? fees[0].totalAmount : 0;
  const [editableFeeAmount, setEditableFeeAmount] = useState<number>(activeFeeAmount);

  // Extracción de períodos únicos
  const availablePeriods = Array.from(
    new Map(
      fees?.map(fee => {
        const periodKey = fee.payslip._id;
        const label = formatPeriod(fee.payslip.startedAt);
        const isClosed = !!fee.payslip.closedAt;
        return [periodKey, { id: periodKey, label, isClosed, startedAt: fee.payslip.startedAt }];
      }) || []
    ).values()
  ).sort((a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime());

  const periodOptions = [
    { label: "Todos los períodos", value: "all" },
    ...availablePeriods.map(period => ({
      label: `${period.label} ${period.isClosed ? "" : "(En curso)"}`,
      value: period.id
    }))
  ];
  
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
    const matchesPeriod = selectedPeriod === "all" || fee.payslip._id === selectedPeriod;

    return matchesSearch && matchesState && matchesPeriod;
  });

  const columns = [
    { header: "N°", accessor: (_: FullFee, index: number) => index + 1 },
    { header: "Explorador", accessor: (fee: FullFee) => fee.child.name },
    { header: "DNI", accessor: (fee: FullFee) => fee.child.dni },
    { 
      header: "Periodo", 
      accessor: (fee: FullFee) => {
        const startFormatted = formatPeriod(fee.payslip.startedAt);
        if (!fee.payslip.closedAt) {
          return (
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
              {startFormatted} (En curso)
            </span>
          );
        }
        const endFormatted = formatDateOnly(fee.payslip.closedAt);
        return (
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 shadow-2xs">
            {startFormatted} - {endFormatted}
          </span>
        );
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
            <button
              onClick={() => handleOpenDetail(fee)}
              className="p-1.5 bg-gray-100 hover:bg-blue-500 hover:text-white text-slate-600 rounded-lg transition-colors cursor-pointer shadow-2xs"
              title="Ver detalle"
            >
              <Eye size={16} />
            </button>
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

      {/* Componente Modular de Filtros y Búsqueda */}
      <FeesFilters
        filterState={filterState}
        setFilterState={setFilterState}
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        periodOptions={periodOptions}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Vista Escritorio */}
      <div className="hidden md:block">
        <List<FullFee>
          data={filteredFees}
          columns={columns}
          onSearch={setSearchTerm}
          searchPlaceholder="Buscar por explorador o DNI..."
        />
      </div>

      {/* Vista Móvil */}
      <div className="md:hidden flex flex-col gap-3">
        {filteredFees?.map((fee: FullFee) => {
          const safeFee = {
            ...fee,
            startedAt: formatPeriod(fee.payslip.startedAt),
            closedAt: fee.payslip.closedAt ? formatDateOnly(fee.payslip.closedAt) : "(En curso)",
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

      <FeeDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onPay={handleOpenPay} 
        fee={selectedFee}
      />
    </div>
  );
}