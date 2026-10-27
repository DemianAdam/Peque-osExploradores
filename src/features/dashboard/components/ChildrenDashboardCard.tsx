import { Users, ArrowRight } from "lucide-react";
import { DashboardCard } from "@shared/components/DashboardCard";
import { useNavigate } from "react-router";
import { useQuery } from "convex/react";
import { api } from "@convex/_generated/api";

export function ChildrenDashboardCard() {
  const navigate = useNavigate();
  const stats = useQuery(api.children.queries.getDashboardStats);

  const activeCount = stats?.activeCount ?? 0;
  const monthsData = stats?.monthsData ?? [];
  const maxCount = Math.max(...monthsData.map(s => s.count), activeCount, 1);

  return (
    <DashboardCard title="ESTADÍSTICA CHICOS">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
            <Users size={18} className="text-pink-500" />
            <span>Evolución de matrícula activa</span>
          </div>
          <span className="text-xs bg-pink-50 text-pink-600 px-2.5 py-1 rounded-full font-bold">
            Actual: {activeCount}
          </span>
        </div>

        {/* Gráfico de barras */}
        <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 flex items-end justify-between gap-2 h-36 pt-6">
          {monthsData.map((stat, index) => {
            const heightPercentage = (stat.count / maxCount) * 100;
            const isLatest = index === monthsData.length - 1;

            return (
              <div key={stat.month} className="flex flex-col items-center flex-1 gap-1.5 h-full justify-end">
                <span className="text-[10px] font-bold text-slate-500">{stat.count}</span>
                <div className="w-full max-w-7 bg-gray-200 rounded-t-lg h-full flex items-end overflow-hidden">
                  <div 
                    style={{ height: `${heightPercentage}%` }} 
                    className={`w-full transition-all duration-500 rounded-t-lg ${
                      isLatest ? "bg-pink-500 shadow-sm" : "bg-pink-300"
                    }`}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">{stat.month}</span>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => navigate("/chicos")}
          className="text-xs font-bold text-pink-600 hover:text-pink-700 flex items-center gap-1 self-end transition-colors pt-1 cursor-pointer"
        >
          Ver listado completo de exploradores <ArrowRight size={14} />
        </button>
      </div>
    </DashboardCard>
  );
}