"use client";
import { useState } from "react";
import { List } from "@ui/List";
import { Eye, Calculator } from "lucide-react";
import { PayslipDetailModal } from "@features/payslips/components/PayslipDetailModal";
import { PayslipDeleteModal } from "@features/payslips/components/PayslipDeleteModal";
import { CloseMonthModal } from "@features/payslips/components/CloseMonthModal";
import { PayslipCard } from "../components/PayslipCard";
import { PayslipsCalendarView } from "../components/PayslipsCalendarView";
import { PayslipFeeModal } from "../components/PayslipFeeModal";

interface FullPayslip {
  _id: string;
  periodo: string;
  fecha_inicio: string;
  fecha_cierre: string;
  total_recaudado: number;
  total_gastos: number;
  id_seño: string;
  porcentaje_socio: number;
}

const MOCK_PAYSLIPS: FullPayslip[] = [
  {
    _id: "1",
    periodo: "Marzo 2026",
    fecha_inicio: "01/03/2026",
    fecha_cierre: "31/03/2026",
    total_recaudado: 450000,
    total_gastos: 50000,
    id_seño: "Seño Ana",
    porcentaje_socio: 30,
  },
  {
    _id: "2",
    periodo: "Febrero 2026",
    fecha_inicio: "01/02/2026",
    fecha_cierre: "28/02/2026",
    total_recaudado: 380000,
    total_gastos: 30000,
    id_seño: "Seño Ana",
    porcentaje_socio: 30,
  },
];

export default function Payslips() {
  const [payslips, setPayslips] = useState<FullPayslip[]>(MOCK_PAYSLIPS);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayslip, setSelectedPayslip] = useState<FullPayslip | null>(null);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFeeModalOpen, setIsFeeModalOpen] = useState(false);
  const [feeAmount, setFeeAmount] = useState<number>(15000);
  const [closeForm, setCloseForm] = useState({
    periodo: "Abril 2026",
    fecha_inicio: "01/04/2026",
    fecha_cierre: "30/04/2026",
    total_recaudado: 520000,
    total_gastos: 40000,
    id_seño: "Seño Ana",
    porcentaje_socio: 30,
  });

  const handleSaveCloseMonth = () => {
    const newPayslip: FullPayslip = {
      _id: String(Date.now()),
      periodo: closeForm.periodo,
      fecha_inicio: closeForm.fecha_inicio,
      fecha_cierre: closeForm.fecha_cierre,
      total_recaudado: closeForm.total_recaudado,
      total_gastos: closeForm.total_gastos,
      id_seño: closeForm.id_seño,
      porcentaje_socio: Number(closeForm.porcentaje_socio),
    };

    setPayslips([newPayslip, ...payslips]);
    setIsCloseModalOpen(false);
    setIsFeeModalOpen(true);
  };
  const handleConfirmFeeAndFinalize = () => {
    console.log("Valor de cuota final:", feeAmount);
    setIsFeeModalOpen(false);
    alert(`¡Liquidación completada con éxito! Cuota siguiente periodo: $${feeAmount}`);
  };

  const handleConfirmDelete = (id: string) => {
    setPayslips(payslips.filter(p => p._id !== id));
    setSelectedPayslip(null);
  };

  const filteredPayslips = payslips.filter(p => 
    p.periodo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { header: "Período", accessor: (p: FullPayslip) => p.periodo },
    { header: "Total Recaudado", accessor: (p: FullPayslip) => `$${p.total_recaudado.toLocaleString()}` },
    { header: "Total Gastos", accessor: (p: FullPayslip) => `$${p.total_gastos.toLocaleString()}` },
    { header: "% Socio", accessor: (p: FullPayslip) => `${p.porcentaje_socio}%` },
    { 
      header: "Detalle", 
      accessor: (p: FullPayslip) => (
        <button 
          onClick={() => setSelectedPayslip(p)}
          className="bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full font-bold hover:bg-pink-200 transition-colors flex items-center gap-1"
        >
          <Eye size={18} />
        </button>
      ) 
    }
  ];

  const isLatestPayslip = selectedPayslip && payslips.length > 0 && payslips[0]._id === selectedPayslip._id;

  return (
    <>
      <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col p-8 px-6">
        <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">LISTA</h2>
        <h3 className="text-4xl font-bold text-pink-500 mb-6 drop-shadow-sm text-left">Liquidaciones</h3>

        {/* Botón de Cierre de Mes */}
        <div className="mb-8">
          <button
            onClick={() => setIsCloseModalOpen(true)}
            className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <Calculator size={26} />
            Liquidar Mes
          </button>
        </div>

        {/* Selector de modo de vista (Lista / Calendario) */}
        <div className="flex bg-pink-200/50 p-1 rounded-2xl w-fit mb-6">
          <button
            onClick={() => setViewMode("list")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              viewMode === "list" ? "bg-pink-500 text-white shadow-sm" : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Vista Lista
          </button>
          <button
            onClick={() => setViewMode("calendar")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              viewMode === "calendar" ? "bg-pink-500 text-white shadow-sm" : "text-slate-700 hover:text-slate-900"
            }`}
          >
            Vista Calendario / Comparativa
          </button>
        </div>

        {/* Contenido principal según la vista seleccionada */}
        {viewMode === "list" ? (
          <div>
            {/* 🖥️ ESCRITORIO: Renderiza la tabla oficial de <List /> */}
            <div className="hidden md:block">
              <List<FullPayslip>
                data={filteredPayslips}
                columns={columns}
                onSearch={(term) => setSearchTerm(term)}
                searchPlaceholder="Buscar liquidación..."
              />
            </div>

            {/* 📱 MÓVIL: Renderiza tus tarjetas exclusivas de Payslips */}
            <div className="md:hidden flex flex-col gap-4">
              {/* Buscador para móvil */}
              <input
                type="text" 
                placeholder="Buscar liquidación..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 transition shadow-sm mb-2"
              />

              {filteredPayslips.map((payslip: FullPayslip, index: number) => (
                <PayslipCard 
                  key={payslip._id}
                  payslip={payslip} 
                  isLatest={index === 0} 
                  onSelect={(p) => setSelectedPayslip(p)}
                />
              ))}
            </div>
          </div>
        ) : (
          /* Vista Calendario (aplica tanto para PC como móvil o según cómo lo maneje tu componente) */
          <PayslipsCalendarView 
            payslips={filteredPayslips} 
            onSelect={(p) => setSelectedPayslip(p)} 
          />
        )}

        {/* Modales */}
        {selectedPayslip && (
          <PayslipDetailModal 
            key={selectedPayslip._id}
            payslip={selectedPayslip}
            isOpen={!!selectedPayslip}
            onClose={() => setSelectedPayslip(null)}
            onOpenDeleteModal={
              isLatestPayslip 
                ? () => setIsDeleteModalOpen(true) 
                : undefined
            }
          />
        )}

        {selectedPayslip && (
          <PayslipDeleteModal
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            payslipId={selectedPayslip.periodo}
            onConfirm={() => handleConfirmDelete(selectedPayslip._id)}
          />
        )}

        {isCloseModalOpen && (
          <CloseMonthModal
            isOpen={isCloseModalOpen}
            onClose={() => setIsCloseModalOpen(false)}
            closeForm={closeForm}
            onChangeForm={setCloseForm}
            onConfirm={handleSaveCloseMonth}
          />
        )}

        {isFeeModalOpen && (
          <PayslipFeeModal
            isOpen={isFeeModalOpen}
            onClose={() => setIsFeeModalOpen(false)}
            feeAmount={feeAmount}
            onFeeChange={setFeeAmount}
            onConfirm={handleConfirmFeeAndFinalize}
          />
        )}
      </div>
    </>
  );
}