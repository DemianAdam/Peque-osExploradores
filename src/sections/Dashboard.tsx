import { useOutletContext } from "react-router";
import { Teacher } from "../../convex/teachers/types";


export default function Dashboard() {
  const teacher = useOutletContext<Teacher>();
  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col pt-8 px-6">
      <h3 className="text-2xl font-bold text-orange-500 mb-8 drop-shadow-sm text-right">Bienvenida, {teacher.name}</h3>
      <h2 className="font-angkor text-[30px] text-[#1E293B] font-normal mb-6 text-center">PANEL DE ATAJOS</h2>
      {/* Aquí luego pondremos tus DashboardCard */}
      <div className="bg-white p-4 rounded-lg shadow pt-12 mb-4">
        <p>ESTADISTICA CHICOS</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow pt-12 mb-4">
        <p>LIQUIDACIONES </p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow pt-12 mb-4">
        <p>GASTOS</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow pt-12 mb-4">
        <p>PAGOS</p>
      </div>
    </div>
  );
}

