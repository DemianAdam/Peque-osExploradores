
import { useOutletContext, useNavigate } from "react-router";
import { Teacher } from "@shared/types/convex";
import { CreditCard, Receipt, Plus } from "lucide-react";


// Importamos las tres tarjetas específicas
import { ChildrenDashboardCard } from "../components/ChildrenDashboardCard";
import { ExpensesDashboardCard } from "../components/ExpensesDashboardCard";
import { FeesDashboardCard } from "../components/FeesDashboardCard";
import ClosePayslipButton from "@/shared/components/ClosePayslipButton";

export default function Dashboard() {
  const teacher = useOutletContext<Teacher>();
  const navigate = useNavigate();


  return (
    <div className="w-full flex flex-col pt-8 px-6 pb-12">
      {/* Saludo */}
      <h3 className="text-xl font-bold text-pink-500 mb-1 drop-shadow-sm text-left">
        Bienvenida, {teacher.name}
      </h3>
      
      {/* Título del Panel */}
      <h2 className="font-angkor text-[30px] text-[#1E293B] font-normal mb-6 text-left">
        PANEL DE ATAJOS
      </h2>

      {/* Botón Principal de Cierre de Mes y Accesos Rápidos (Pagos y Gastos) */}
      <div className="w-full max-w-6xl mx-auto mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="w-full flex-1">
          <ClosePayslipButton />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button
            onClick={() => navigate("/pagos/nuevo")}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <CreditCard size={18} />
            <Plus size={14} className="-ml-1" />
            <span>Nuevo Pago</span>
          </button>
          <button
            onClick={() => navigate("/gastos/nuevo")}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-5 rounded-2xl shadow-md transition-all cursor-pointer"
          >
            <Receipt size={18} />
            <Plus size={14} className="-ml-1" />
            <span>Nuevo Gasto</span>
          </button>
        </div>
      </div>

      {/* Grid con las 3 tarjetas específicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
        <FeesDashboardCard />
        <ExpensesDashboardCard />
        <ChildrenDashboardCard />
      </div>

     
    </div>
  );
}