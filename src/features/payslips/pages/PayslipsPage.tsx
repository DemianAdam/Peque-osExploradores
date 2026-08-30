"use client";
import { useState } from "react";
import { List } from "@ui/List";
import { Eye, Calculator } from "lucide-react";
import { PayslipDetailModal } from "@features/payslips/components/PayslipDetailModal";
import { PayslipDeleteModal } from "@features/payslips/components/PayslipDeleteModal";

import { PayslipCard } from "../components/PayslipCard";
import { PayslipsCalendarView } from "../components/PayslipsCalendarView";


import { api } from "@convex/_generated/api";
import { FullPayslip } from "@convex/payslips";
import ClosePayslipButton from "@/shared/components/ClosePayslipButton";
import { useQuery } from "convex/react";




export default function Payslips() {
  const payslipsData = useQuery(api.payslips.queries.getPayslips) || [];
  const [payslips, setPayslips] = useState<FullPayslip[]>(payslipsData);
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPayslip, setSelectedPayslip] = useState<FullPayslip | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);



  const handleConfirmDelete = (id: string) => {
    setPayslips(payslips.filter(p => p._id !== id));
    setSelectedPayslip(null);
  };

  /*TODO DEMIAN: search
  const filteredPayslips = payslips.filter(p => 
    p.periodo.toLowerCase().includes(searchTerm.toLowerCase())
  );*/

  const columns = [
    { header: "Período", accessor: (p: FullPayslip) => p.startedAt },
    { header: "Total Recaudado", accessor: (p: FullPayslip) => `$${p.payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}` },
    { header: "Total Gastos", accessor: (p: FullPayslip) => `$${p.invoices.reduce((sum, invoice) => sum + invoice.amount, 0).toLocaleString()}` },
    { header: "% Socio", accessor: (p: FullPayslip) => `${p.partnerPercentage}%` },
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
          <ClosePayslipButton />
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
              //TODO DEMIAN: filtrar
              <List<FullPayslip>
                data={payslips}
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

              {payslips.map((payslip: FullPayslip, index: number) => (
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
            payslips={payslips} 
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
            payslipId={selectedPayslip._id}
            onConfirm={() => handleConfirmDelete(selectedPayslip._id)}
          />
        )}

      </div>
    </>
  );
}