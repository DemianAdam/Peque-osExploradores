import { useState } from "react";
import { List } from "@/components/UI/List";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { FullFee } from "../../convex/fees/types";

export default function Fees() {
  const fees = useQuery(api.fees.queries.getFees);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState<"all" | "pending" | "partial" | "paid">("all");

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
    { header: "Periodo", accessor: (fee: FullFee) => `${fee.startedAt} al ${fee.closedAt}` },
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

      <List<FullFee>
        data={filteredFees}
        columns={columns}
        onSearch={setSearchTerm}
        searchPlaceholder="Buscar por explorador o DNI..."
        // TODO: Si se requiere registrar un pago o nueva cuota desde esta vista, implementar onAdd={() => { ... }} y la mutación correspondiente.
        renderMobileItem={(fee) => {
          const stateConfig = {
            paid: {
              label: "Pagada",
              color: "bg-emerald-100 text-emerald-700",
              borderLeft: "bg-emerald-500"
            },
            partial: {
              label: "Parcial",
              color: "bg-blue-100 text-blue-700",
              borderLeft: "bg-blue-500"
            },
            pending: {
              label: "Pendiente",
              color: "bg-rose-100 text-rose-700",
              borderLeft: "bg-rose-500"
            },
          };
          const current = stateConfig[fee.state];

          return (
            <div className="flex flex-col gap-3 relative">
              {/* Barra lateral dinámica según el estado */}
              <div className={`absolute -left-5 -top-5 -bottom-5 w-1.5 ${current.borderLeft}`} />

              {/* Cabecera de la card */}
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-slate-800 text-base">{fee.child.name}</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${current.color}`}>
                  {current.label}
                </span>
              </div>

              {/* DNI y Periodo */}
              <div className="text-xs text-gray-500 flex justify-between">
                <span>DNI: {fee.child.dni}</span>
                <span>Periodo: {fee.startedAt} al {fee.closedAt}</span>
              </div>

              <hr className="border-gray-100 my-1" />

              {/* Bloque financiero */}
              <div className="bg-gray-50 p-3 rounded-xl flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Total Cuota</span>
                  <span className="text-sm font-bold text-slate-700">${fee.totalAmount.toLocaleString()}</span>
                </div>
                <div className="h-6 w-px bg-gray-200" />
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Abonado</span>
                  <span className="text-sm font-bold text-emerald-600">${fee.paidAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}
