
import { useNavigate } from "react-router";
import { Eye, Trash2, Pencil } from "lucide-react";
import { List } from "../../components/UI/List";
import { Invoice } from "../../../convex/invoices/types"; // Importamos tu tipo real de Convex
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { InvoiceDeleteModal } from "@/components/Modals/InvoiceDeleteModal";
import { InvoiceDetailModal } from "@/components/Modals/InvoiceDetailModal";

export default function Invoices() {
    const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null); 
    const invoices = useQuery(api.invoices.queries.getInvoices);
    const [invoiceToEdit, setInvoiceToEdit] = useState<Invoice | null>(null);
    const [invoiceToDelete, setInvoiceToDelete] = useState<Invoice | null>(null);
    const navigate = useNavigate();
    const deleteInvoiceMutation = useMutation(api.invoices.mutations.deleteInvoice);
    const handleDeleteConfirm = async () => {
        if (!invoiceToDelete) return;

        try {
            // 3. Ejecutamos la mutación pasando el ID como lo pide el validador
            await deleteInvoiceMutation({ id: invoiceToDelete._id });

            // Si todo sale bien, cerramos el modal
            setInvoiceToDelete(null);
        } catch (error) {
            console.error("No se pudo eliminar el gasto:", error);
        }
    };

    const columns = [
        { header: "N°", accessor: (_: Invoice, index: number) => index + 1 },
        { header: "Descripción", accessor: (invoice: Invoice) => invoice.description },
        { header: "Monto", accessor: (invoice: Invoice) => `$${invoice.amount.toFixed(2)}` },
        { header: "Fecha", accessor: (invoice: Invoice) => new Date(invoice.date).toLocaleDateString() },
        {
            header: "Acciones", accessor: (invoice: Invoice) => (
                <div className="flex items-center gap-2">
                    <button
                        // AQUÍ CAMBIAMOS EL NAVIGATE POR EL SETSTATE
                        onClick={() => setSelectedInvoice(invoice)}
                        className="bg-pink-100 text-pink-600 p-2 rounded-full hover:bg-pink-200 transition"
                    >
                        <Eye size={18} />
                    {/* Botón Editar Directo */}
                    </button>
                    <button
                        onClick={() => setInvoiceToEdit(invoice)}
                        className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition"
                        title="Editar gasto"
                    >
                        <Pencil size={18} />
                    </button>
                    
                    <button
                        onClick={() => setInvoiceToDelete(invoice)}
                        className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col p-8 px-6">
            <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">LISTA</h2>
            <h3 className="text-4xl font-bold text-orange-500 mb-8 drop-shadow-sm text-left">Gastos</h3>

            <List<Invoice>
                data={invoices ?? []}
                columns={columns}
                onSearch={(term) => console.log("Searching:", term)}
                onAdd={() => navigate("/gastos/nuevo")}
                buttonLabel=""
            />

            {/* Modal de Detalle abierto DIRECTO en Modo Edición */}
            {invoiceToEdit && (
                <InvoiceDetailModal
                    key={invoiceToEdit._id}
                    invoice={invoiceToEdit}
                    onClose={() => setInvoiceToEdit(null)}
                    initialEditing={true} // <--- Esto hace la magia
                />
            )}

            {selectedInvoice && (
            <InvoiceDetailModal
                key={selectedInvoice._id}
                invoice={selectedInvoice}
                onClose={() => setSelectedInvoice(null)}       />
            )}



            {/* Modal de Eliminación */}
            <InvoiceDeleteModal
                isOpen={!!invoiceToDelete}
                onClose={() => setInvoiceToDelete(null)}
                onConfirm={handleDeleteConfirm}
                description={invoiceToDelete?.description ?? ""}
            />
        </div>
    );
}