import { useState } from "react";
import { DashboardCard } from "@shared/components/DashboardCard";
import { useNavigate } from "react-router";
import { PieChart, BarChart3, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export function ExpensesDashboardCard() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"monthly" | "annual">("monthly");
  const stats = useQuery(api.invoices.queries.getDashboardStats);

  const capitalizedPeriod = stats?.periodLabel ?? "Cargando...";
  const currentTotal = stats?.currentTotal ?? 0;
  const currentPaymentTotal = stats?.currentPaymentTotal ?? 0;
  

  const annualData = stats?.annualData ?? [];
  const maxAnnualValue = Math.max(
    ...annualData.flatMap(e => [e.total, e.paymentTotal]),
    1000
  );

  return (
    <DashboardCard title="INGRESOS Y GASTOS">
      <div className="flex flex-col gap-4">
        
        {/* Cabecera y Botón de Alternancia (Toggle) */}
        <div className="flex justify-between items-center">
          <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-bold">
            {viewMode === "monthly" ? capitalizedPeriod : "Histórico Anual"}
          </span>

          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("monthly")}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === "monthly" ? "bg-white text-slate-800 shadow-sm" : "text-gray-400 hover:text-slate-600"
              }`}
              title="Ver resumen del ciclo actual"
            >
              <PieChart size={14} />
              <span className="hidden sm:inline">Ciclo Actual</span>
            </button>
            <button
              onClick={() => setViewMode("annual")}
              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${
                viewMode === "annual" ? "bg-white text-slate-800 shadow-sm" : "text-gray-400 hover:text-slate-600"
              }`}
              title="Ver evolución anual de ingresos vs gastos"
            >
              <BarChart3 size={14} />
              <span className="hidden sm:inline">Anual</span>
            </button>
          </div>
        </div>

        {/* CONTENIDO 1: Vista Mensual / Ciclo Abierto (Comparación Ingresos vs Gastos + Desglose) */}
        {viewMode === "monthly" ? (
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 flex flex-col gap-3">
            {/* Tarjetas resumen Ingresos / Gastos */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-emerald-100 flex flex-col shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 mb-1">
                  <TrendingUp size={14} />
                  <span>Ingresos (Pagos)</span>
                </div>
                <span className="text-sm font-bold text-slate-800">${currentPaymentTotal.toLocaleString()}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-rose-100 flex flex-col shadow-2xs">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-rose-600 mb-1">
                  <TrendingDown size={14} />
                  <span>Gastos</span>
                </div>
                <span className="text-sm font-bold text-slate-800">${currentTotal.toLocaleString()}</span>
              </div>
            </div>

          </div>
        ) : (
          /* CONTENIDO 2: Vista Anual (Gráfico de barras comparativo: Pagos vs Gastos) */
          <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 flex flex-col gap-2">
            <div className="flex justify-center items-center gap-4 text-[10px] font-semibold text-slate-500 mb-1">
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
                <span>Ingresos (Pagos)</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
                <span>Gastos</span>
              </div>
            </div>

            <div className="flex items-end justify-between gap-2 h-32 pt-2">
              {annualData.map((item, index) => {
                const paymentHeight = (item.paymentTotal / maxAnnualValue) * 100;
                const expenseHeight = (item.total / maxAnnualValue) * 100;
                const isLatest = index === annualData.length - 1;

                return (
                  <div key={item.month} className="flex flex-col items-center flex-1 gap-1.5 h-full justify-end">
                    <div className="w-full flex items-end justify-center gap-0.5 h-full bg-gray-200/50 rounded-t-lg p-0.5">
                      {/* Barra Pagos (Ingresos) */}
                      <div 
                        style={{ height: `${Math.max(paymentHeight, 4)}%` }} 
                        className={`w-1/2 transition-all duration-500 rounded-t-sm ${
                          isLatest ? "bg-emerald-500 shadow-sm" : "bg-emerald-300"
                        }`}
                        title={`Pagos: $${item.paymentTotal.toLocaleString()}`}
                      />
                      {/* Barra Gastos */}
                      <div 
                        style={{ height: `${Math.max(expenseHeight, 4)}%` }} 
                        className={`w-1/2 transition-all duration-500 rounded-t-sm ${
                          isLatest ? "bg-rose-500 shadow-sm" : "bg-rose-300"
                        }`}
                        title={`Gastos: $${item.total.toLocaleString()}`}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600">{item.month}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Enlaces de navegación */}
        <div className="flex justify-between items-center pt-1">
          <button 
            onClick={() => navigate("/pagos")}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            Ver pagos <ArrowRight size={14} />
          </button>
          <button 
            onClick={() => navigate("/gastos")}
            className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 transition-colors cursor-pointer"
          >
            Ver gastos <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </DashboardCard>
  );
}