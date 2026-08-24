import { useState } from "react";
import { DashboardCard } from "./DashboardCard";
import { useNavigate } from "react-router";
import { Clock, AlertCircle, Eye, ArrowRight } from "lucide-react";
import FeeDetailModal from "../Modals/FeeDetailModal";


interface FeeItem {
  _id: string;
  state: "paid" | "partial" | "pending";
  child: {
    _id: string;
    name: string;
    dni: string;
  };
  startedAt: string;
  closedAt: string;
  totalAmount: number;
  paidAmount: number;
}

// TODO: Socio, reemplazar con la query real de Convex para cuotas pendientes/parciales del mes actual
const MOCK_PENDING_FEES: FeeItem[] = [
  {
    _id: "2",
    state: "partial",
    child: { _id: "child_2",name: "Lucía Pérez", dni: "46789123" },
    startedAt: "01/08/2026",
    closedAt: "31/08/2026",
    totalAmount: 15000,
    paidAmount: 5000,
  },
  {
    _id: "3",
    state: "pending",
    child: { _id: "child_3", name: "Joaquín Benítez", dni: "45987321" },
    startedAt: "01/08/2026",
    closedAt: "31/08/2026",
    totalAmount: 15000,
    paidAmount: 0,
  },
];

export function FeesCard() {
  const navigate = useNavigate();

  // TODO:Estados para controlar el modal de detalle de una cuota específica
  const [selectedFee, setSelectedFee] = useState<FeeItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const handleOpenDetail = (fee: FeeItem) => {
    setSelectedFee(fee);
    setIsDetailModalOpen(true);
  };

  return (
    <DashboardCard title="PAGOS Y CUOTAS">
      <div className="flex flex-col gap-4">
        
        {/* Cabecera informativa */}
        <div className="flex justify-between items-center">
          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-bold">
            Agosto 2026 (Ciclo Abierto)
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {MOCK_PENDING_FEES.length} pendientes de cobro
          </span>
        </div>

        {/* Lista resumida de deudores / pendientes en la card */}
        <div className="bg-gray-50/80 p-3 rounded-2xl border border-gray-100 flex flex-col gap-2.5">
          {MOCK_PENDING_FEES.length > 0 ? (
            MOCK_PENDING_FEES.map((fee) => {
              const isPending = fee.state === "pending";
              
              return (
                <div 
                  key={fee._id} 
                  className="bg-white p-2.5 rounded-xl border border-gray-100 flex justify-between items-center shadow-2xs hover:border-blue-200 transition-all"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-800">{fee.child.name}</span>
                    <span className="text-[10px] text-gray-400">DNI: {fee.child.dni}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md inline-flex items-center gap-1 ${
                        isPending ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {isPending ? <Clock size={10} /> : <AlertCircle size={10} />}
                        {isPending ? "Pendiente" : "Parcial"}
                      </span>
                    </div>

                    {/* BOTÓN DE DETALLE (El clásico botón con icono que me mencionaste) */}
                    <button
                      onClick={() => handleOpenDetail(fee)}
                      className="p-1.5 bg-gray-100 hover:bg-blue-500 hover:text-white text-slate-600 rounded-lg transition-colors cursor-pointer"
                      title="Ver detalle de la cuota"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-xs text-center text-slate-400 py-4 italic">¡Todas las cuotas están al día este mes! 🎉</p>
          )}
        </div>

        {/* Enlace general para ver todas las cuotas */}
        <button 
          onClick={() => navigate("/cuotas")}
          className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-end transition-colors pt-1 cursor-pointer"
        >
          Ver listado completo de cuotas <ArrowRight size={14} />
        </button>

      
      {/* Enlace general para ver todas las pagos */}
        <button 
          onClick={() => navigate("/pagos")}
          className="text-xs font-bold text-green-600 hover:text-green-700 flex items-center gap-1 self-end transition-colors pt-1 cursor-pointer"
        >
          Ver listado completo de pagos <ArrowRight size={14} />
        </button>

      </div>

      
      {isDetailModalOpen && selectedFee && (
        <FeeDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          fee={selectedFee}
        />
      )} 
    </DashboardCard>
  );
}