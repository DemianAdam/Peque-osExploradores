
import { useNavigate } from "react-router";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { List } from "../../components/UI/List";
import { Invoice } from "../../../convex/invoices/types"; // Importamos tu tipo real de Convex
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function Invoices() {
    // TODO: Crear Query para obtener los invoices desde Convex y reemplazar el mock temporal
    //const invoices = useQuery(api.invoices.queries.getInvoices);

    // Mock temporal fuertemente tipado con Invoice (solo para probar visualmente)
    const invoices: Invoice[] = [
        {
            _id: "1" as any,
            _creationTime: Date.now(),
            description: "Compra de materiales didácticos",
            amount: 15000,
            date: Date.now(),
            teacherId: "teacher_1" as any,
            payslipId: null
        },
    ];

    const navigate = useNavigate();

    const columns = [
        { header: "N°", accessor: (_: Invoice, index: number) => index + 1 },
        { header: "Descripción", accessor: (invoice: Invoice) => invoice.description },
        { header: "Monto", accessor: (invoice: Invoice) => `$${invoice.amount.toFixed(2)}` },
        { header: "Fecha", accessor: (invoice: Invoice) => new Date(invoice.date).toLocaleDateString() },
        {
            header: "Acciones",
            accessor: (invoice: Invoice) => (
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => navigate(`/invoices/${invoice._id}`)}
                        className="bg-sky-100 text-sky-600 p-2 rounded-full hover:bg-sky-200 transition"
                        title="Ver detalle"
                    >
                        <Eye size={18} />
                    </button>
                    <button
                        onClick={() => navigate(`/gastos/editar/${invoice._id}`)}
                        className="bg-orange-100 text-pink-600 px-3 py-1 rounded-full font-bold hover:bg-orange-200 transition"
                        title="Editar"
                    >
                        <Pencil size={18} />
                    </button>
                    <button
                        onClick={() => console.log("Eliminar", invoice._id)}
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
                data={invoices}
                columns={columns}
                onSearch={(term) => console.log("Searching:", term)}
                onAdd={() => navigate("/gastos/nuevo")}
                buttonLabel=""
            />
        </div>
    );
}