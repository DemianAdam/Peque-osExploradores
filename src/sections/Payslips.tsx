"use client";
import { useState } from "react";
import { List } from "../components/UI/List";
import { Eye, Calculator } from "lucide-react";
import PayslipsDetailModal from "@/components/Modals/PayslipsDetailModal";
import { Modal } from "../components/UI/Modal";
import { BaseInput } from "../components/UI/BaseInput";

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
  const [selectedPayslip, setSelectedPayslip] = useState<FullPayslip | null>(null);
  
  // Estado para controlar la apertura del modal de "Cerrar Mes"
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  
  // Estado del formulario de cierre de mes
  const [closeForm, setCloseForm] = useState({
    periodo: "Abril 2026",
    fecha_inicio: "2026-04-01",
    fecha_cierre: "2026-04-30",
    porcentaje_socio: 30,
  });

  const handleSaveCloseMonth = () => {
    const newPayslip: FullPayslip = {
      _id: String(Date.now()),
      periodo: closeForm.periodo,
      fecha_inicio: closeForm.fecha_inicio.split("-").reverse().join("/"), // Formato visual DD/MM/YYYY
      fecha_cierre: closeForm.fecha_cierre.split("-").reverse().join("/"),
      total_recaudado: 520000, // Simulado o calculado de los movimientos
      total_gastos: 40000,     // Simulado o calculado de los movimientos
      id_seño: "Seño Ana",
      porcentaje_socio: Number(closeForm.porcentaje_socio),
    };

    setPayslips([newPayslip, ...payslips]);
    setIsCloseModalOpen(false);
    alert("¡Mes cerrado y liquidado exitosamente!");
  };

  const columns = [
    { header: "N°", accessor: (_: FullPayslip, index: number) => index + 1 },
    { header: "Período", accessor: (p: FullPayslip) => p.periodo },
    { header: "Total Recaudado", accessor: (p: FullPayslip) => `$${p.total_recaudado.toLocaleString()}` },
    { header: "Total Gastos", accessor: (p: FullPayslip) => `$${p.total_gastos.toLocaleString()}` },
    { header: "% Socio", accessor: (p: FullPayslip) => `${p.porcentaje_socio}%` },
    { 
      header: "Detalle", 
      accessor: (p: FullPayslip) => (
        <button 
          key={p._id}
          onClick={() => setSelectedPayslip(p)}
          className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full font-bold hover:bg-orange-200 transition-colors flex items-center gap-1"
        >
          <Eye size={18} />
        </button>
      ) 
    }
  ];

  return (
    <>
      <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col p-8 px-6">
        <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">LISTA</h2>
        <h3 className="text-4xl font-bold text-orange-500 mb-6 drop-shadow-sm text-left">Liquidaciones</h3>

        <div className="mb-8">
          <button
            onClick={() => setIsCloseModalOpen(true)}
            className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <Calculator size={26} />
            Cerrar Mes y Liquidar Movimientos
          </button>
        </div>

        <List<FullPayslip>
          data={payslips}
          columns={columns}
          onSearch={(term) => console.log(term)}
        />

        {/* Modal de Detalle */}
        {selectedPayslip && (
          <PayslipsDetailModal 
            key={selectedPayslip._id}
            payslip={selectedPayslip}
            isOpen={!!selectedPayslip}
            onClose={() => setSelectedPayslip(null)}
            
          />
        )}

        {/* Modal para Cerrar Mes */}
        {isCloseModalOpen && (
          <Modal
            isOpen={isCloseModalOpen}
            onClose={() => setIsCloseModalOpen(false)}
            title={<span className="text-orange-500 font-bold">Cierre de Ciclo / Mes</span>}
          >
            <div className="flex flex-col gap-4">
              <BaseInput
                label="Período"
                value={closeForm.periodo}
                onChange={(e) => setCloseForm({ ...closeForm, periodo: e.target.value })}
              />
              <BaseInput
                label="Fecha de Inicio"
                type="date"
                value={closeForm.fecha_inicio}
                onChange={(e) => setCloseForm({ ...closeForm, fecha_inicio: e.target.value })}
              />
              <BaseInput
                label="Fecha de Cierre"
                type="date"
                value={closeForm.fecha_cierre}
                onChange={(e) => setCloseForm({ ...closeForm, fecha_cierre: e.target.value })}
              />
              <BaseInput
                label="Porcentaje del Socio (%)"
                type="number"
                value={closeForm.porcentaje_socio}
                onChange={(e) => setCloseForm({ ...closeForm, porcentaje_socio: Number(e.target.value) })}
              />

              <button
                onClick={handleSaveCloseMonth}
                className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition shadow-md"
              >
                Confirmar Cierre y Liquidar
              </button>
            </div>
          </Modal>
        )}
      </div>
    </>
  );
}