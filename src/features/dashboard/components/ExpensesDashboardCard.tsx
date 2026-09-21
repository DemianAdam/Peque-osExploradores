import { useState } from "react";
import { DashboardCard } from "@shared/components/DashboardCard";
import { useNavigate } from "react-router";
import { PieChart, BarChart3, ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export function ExpensesDashboardCard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");
  const stats = useQuery(api.invoices.queries.getDashboardStats);

  const colors = ["bg-pink-500", "bg-amber-400", "bg-blue-400", "bg-purple-400", "bg-emerald-400"];

  const capitalizedPeriod = stats?.periodLabel ?? "Cargando...";
  const currentTotal = stats?.currentTotal ?? 0;
  
  const categories = (stats?.categories ?? []).map((cat, index) => ({
    ...cat,
    color: colors[index % colors.length]
  }));

  const annualData = stats?.annualData ?? [];
  const maxAnnualExpense = Math.max(...annualData.map(e => e.total), 1000);

  return (
    <DashboardCard title="GASTOS">
      <div className="flex flex-col gap-4">
        
        {/* Cabecera y Botón de Alternancia (Toggle) */}
        <div className="flex justify-between items-center">
          <span className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full font-bold">
            {viewMode === "monthly" ? capitalizedPeriod : "Histórico Anual"}
          </span>

          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("monthly")}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === "monthly" ? "bg-white text-slate-800 shadow-sm" : "text-gray-400 hover:text-slate-600"
              }`}
              title="Ver gastos del ciclo actual"
            >
              <PieChart size={14} />
              <span className="hidden sm:inline">Ciclo Actual</span>
            </button>
            <button
              onClick={() => setViewMode("annual")}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === "annual" ? "bg-white text-slate-800 shadow-sm" : "text-gray-400 hover:text-slate-600"
              }`}
              title="Ver evolución anual de gastos"
            >
              <BarChart3 size={14} />
              <span className="hidden sm:inline">Anual</span>
            </button>
          </div>
        </div>

        {/* CONTENIDO 1: Vista Mensual / Ciclo Abierto (Desglose por Categorías) */}
        {viewMode === "monthly" ? (
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 flex flex-col gap-3 h-36 justify-center">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500 font-semibold">Total Acumulado</span>
              <span className="text-sm font-bold text-rose-600">${currentTotal.toLocaleString()}</span>
            </div>

            {/* Barras de progreso por categoría (Simulando distribución de torta/porcentajes) */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-24 pr-1">
              {categories.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600 font-medium truncate max-w-[120px]" title={cat.name}>{cat.name}</span>
                    <span className="text-slate-500 font-bold">${cat.amount.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${cat.percentage}%` }} 
                      className={`h-full rounded-full ${cat.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* CONTENIDO 2: Vista Anual (Gráfico de barras por mes) */
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 flex items-end justify-between gap-2 h-36 pt-6">
            {annualData.map((item, index) => {
              const heightPercentage = (item.total / maxAnnualExpense) * 100;
              const isLatest = index === annualData.length - 1;

              return (
                <div key={item.month} className="flex flex-col items-center flex-1 gap-1.5 h-full justify-end">
                  <span className="text-[9px] font-bold text-slate-500">${(item.total / 1000).toFixed(0)}k</span>
                  <div className="w-full max-w-7 bg-gray-200 rounded-t-lg h-full flex items-end overflow-hidden">
                    <div 
                      style={{ height: `${heightPercentage}%` }} 
                      className={`w-full transition-all duration-500 rounded-t-lg ${
                        isLatest ? "bg-rose-500 shadow-sm" : "bg-rose-300"
                      }`}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-600">{item.month}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Enlace para lista gastos */}
        <button 
          onClick={() => navigate("/gastos")}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 self-end transition-colors pt-1 cursor-pointer"
        >
          Ver listado completo de gastos <ArrowRight size={14} />
        </button>

      </div>
    </DashboardCard>
  );
}