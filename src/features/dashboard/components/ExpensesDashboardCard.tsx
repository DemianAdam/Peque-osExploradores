import { useState } from "react";
import { DashboardCard } from "@shared/components/DashboardCard";
import { useNavigate } from "react-router";
import { PieChart, BarChart3, ArrowRight } from "lucide-react";

// TODO: Socio, conectar con la query real de gastos de Convex.
// 1. Datos para el ciclo abierto actual (ej: Desglose por categorías para la torta / barras de progreso)
const MOCK_CURRENT_EXPENSES = {
  periodo: "Agosto 2026 (Abierto)",
  total: 45000,
  categories: [
    { name: "Materiales Didácticos", amount: 20000, percentage: 44, color: "bg-pink-500" },
    { name: "Refrigerio / Comida", amount: 15000, percentage: 33, color: "bg-amber-400" },
    { name: "Mantenimiento / Varios", amount: 10000, percentage: 23, color: "bg-blue-400" },
  ]
};

// 2. Datos para el histórico anual (para el gráfico de barras por mes)
const MOCK_ANNUAL_EXPENSES = [
  { month: "Abr", total: 30000 },
  { month: "May", total: 35000 },
  { month: "Jun", total: 28000 },
  { month: "Jul", total: 42000 },
  { month: "Ago", total: 45000 },
];

export function ExpensesDashboardCard() {
  const navigate = useNavigate();
  // Estado para alternar entre vista mensual (ciclo abierto) y anual (histórico)
  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");

  const maxAnnualExpense = Math.max(...MOCK_ANNUAL_EXPENSES.map(e => e.total), 50000);

  return (
    <DashboardCard title="GASTOS">
      <div className="flex flex-col gap-4">
        
        {/* Cabecera y Botón de Alternancia (Toggle) */}
        <div className="flex justify-between items-center">
          <span className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full font-bold">
            {viewMode === "monthly" ? MOCK_CURRENT_EXPENSES.periodo : "Histórico Anual"}
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
              <span className="text-sm font-bold text-rose-600">${MOCK_CURRENT_EXPENSES.total.toLocaleString()}</span>
            </div>

            {/* Barras de progreso por categoría (Simulando distribución de torta/porcentajes) */}
            <div className="flex flex-col gap-2">
              {MOCK_CURRENT_EXPENSES.categories.map((cat) => (
                <div key={cat.name} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-slate-600 font-medium">{cat.name}</span>
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
            {MOCK_ANNUAL_EXPENSES.map((item, index) => {
              const heightPercentage = (item.total / maxAnnualExpense) * 100;
              const isLatest = index === MOCK_ANNUAL_EXPENSES.length - 1;

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