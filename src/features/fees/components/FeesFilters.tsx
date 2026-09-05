import { Search } from "lucide-react";
import { BaseSelect } from "@shared/ui/BaseSelect";
import { BaseInput } from "@shared/ui/BaseInput";

interface FeesFiltersProps {
  filterState: "all" | "pending" | "partial" | "paid";
  setFilterState: (state: "all" | "pending" | "partial" | "paid") => void;
  selectedPeriod: string;
  setSelectedPeriod: (period: string) => void;
  periodOptions: { label: string; value: string }[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export function FeesFilters({
  filterState,
  setFilterState,
  selectedPeriod,
  setSelectedPeriod,
  periodOptions,
  searchTerm,
  setSearchTerm,
}: FeesFiltersProps) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      {/* Fila superior: Filtros de Estado + Desplegable de Períodos */}
      <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        
        {/* Filtros por Estado */}
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

        {/* Desplegable de Períodos */}
        <div className="w-full md:w-72">
          <BaseSelect
            label=""
            value={selectedPeriod}
            options={periodOptions}
            onChange={(val) => setSelectedPeriod(val)}
          />
        </div>
      </div>

      <div className="md:hidden relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" size={18} />
        <BaseInput
          type="text"
          placeholder="Buscar por explorador o DNI..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-11 bg-white border-gray-200 focus:border-blue-400"
        />
      </div>
    </div>
  );
}