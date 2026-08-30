
import { useOutletContext } from "react-router";
import { Teacher } from "@shared/types/convex";


// Importamos las tres tarjetas específicas
import { ChildrenDashboardCard } from "../components/ChildrenDashboardCard";
import { ExpensesDashboardCard } from "../components/ExpensesDashboardCard";
import { FeesDashboardCard } from "../components/FeesDashboardCard";
import ClosePayslipButton from "@/shared/components/ClosePayslipButton";

export default function Dashboard() {
  const teacher = useOutletContext<Teacher>();


  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col pt-8 px-6 pb-12">
      {/* Saludo */}
      <h3 className="text-xl font-bold text-pink-500 mb-1 drop-shadow-sm text-left">
        Bienvenida, {teacher.name}
      </h3>
      
      {/* Título del Panel */}
      <h2 className="font-angkor text-[30px] text-[#1E293B] font-normal mb-6 text-left">
        PANEL DE ATAJOS
      </h2>

      {/* Botón Principal de Cierre de Mes */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <ClosePayslipButton />

      </div>

      {/* Grid con las 3 tarjetas específicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
        <ChildrenDashboardCard />
        <ExpensesDashboardCard />
        <FeesDashboardCard />
      </div>

     
    </div>
  );
}