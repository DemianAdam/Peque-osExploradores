import { useState } from "react";
import { useOutletContext } from "react-router";
import { Teacher } from "@shared/types/convex";
import { Calculator } from "lucide-react";
import { CloseMonthModal } from "@features/payslips/components/CloseMonthModal";

// Importamos las tres tarjetas específicas
import { ChildrenDashboardCard } from "../components/ChildrenDashboardCard";
import { ExpensesDashboardCard } from "../components/ExpensesDashboardCard";
import { FeesDashboardCard } from "../components/FeesDashboardCard";

export default function Dashboard() {
  const teacher = useOutletContext<Teacher>();
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const [closeForm, setCloseForm] = useState({
    periodo: "Agosto 2026",
    fecha_inicio: "01/08/2026",
    fecha_cierre: "31/08/2026",
    total_recaudado: 520000,
    total_gastos: 40000,
    id_seño: teacher.name,
    porcentaje_socio: 30,
  });

  const handleSaveCloseMonth = () => {
    console.log("Guardando cierre:", closeForm);
    setIsCloseModalOpen(false);
    alert("¡Mes cerrado y liquidado exitosamente desde el Dashboard!");
  };

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
        <button
          onClick={() => setIsCloseModalOpen(true)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95 cursor-pointer"
        >
          <Calculator size={26} />
          Liquidar Mes
        </button>
      </div>

      {/* Grid con las 3 tarjetas específicas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
        <ChildrenDashboardCard />
        <ExpensesDashboardCard />
        <FeesDashboardCard />
      </div>

      {/* Modal para Cerrar Mes */}
      {isCloseModalOpen && (
        <CloseMonthModal
          isOpen={isCloseModalOpen}
          onClose={() => setIsCloseModalOpen(false)}
          closeForm={closeForm}
          onChangeForm={setCloseForm}
          onConfirm={handleSaveCloseMonth}
        />
      )}
    </div>
  );
}