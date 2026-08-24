import { useState } from "react";
import { useOutletContext } from "react-router";
import { Teacher } from ".../../../convex/teachers/types";
import { DashboardCard } from "./DashboardCard"; // Ajusta tu ruta si es necesario
import { Calculator } from "lucide-react";
import CloseMonthModal from "@/components/Modals/CloseMonthModal"; // Ajusta tu ruta si es necesario

export default function Dashboard() {
  const teacher = useOutletContext<Teacher>();

  // Estado para el modal de Cierre de Mes
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  // Estado del formulario de cierre de mes
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
    // Aquí luego integrarás tu lógica de guardado con Convex
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
      <h2 className="font-angkor text-[30px] text-[#1E293B] font-normal mb-6 text-center">
        PANEL DE ATAJOS
      </h2>

      {/* Botón Principal de Cierre de Ciclo / Mes */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <button
          onClick={() => setIsCloseModalOpen(true)}
          className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <Calculator size={26} />
          Liquidar Mes
        </button>
      </div>

      {/* Grid de Secciones (Tus Cards originales para completar más adelante) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
        <DashboardCard title="ESTADÍSTICA CHICOS">
          <p>Gráficos o métricas rápidas de asistencia/alumnos.</p>
        </DashboardCard>

        <DashboardCard title="LIQUIDACIONES">
          <p>Resumen de haberes y periodos pendientes.</p>
        </DashboardCard>

        <DashboardCard title="GASTOS">
          <p>Control de gastos recientes del mes.</p>
        </DashboardCard>

        <DashboardCard title="PAGOS">
          <p>Estado de los cobros y registros de pagos.</p>
        </DashboardCard>
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