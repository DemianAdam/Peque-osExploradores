import { useQuery } from "convex/react";
import { List } from "@ui/List";
import { api } from "@convex/_generated/api";
import { FullChild } from "@shared/types/convex";
import { useNavigate } from "react-router";
import { Pencil, Eye } from "lucide-react";
import { useState } from "react";
import { ChildDetailModal } from "@features/children/components/ChildDetailModal";

export default function Children() {
    const children = useQuery(api.children.queries.getChildren);
    const navigate = useNavigate();

    const [selectedChild, setSelectedChild] = useState<FullChild | null>(null);
    const [isEditingMode, setIsEditingMode] = useState(false);

    const columns = [
        { header: "N°", accessor: (_: FullChild, index: number) => index + 1 },
        { header: "Nombre", accessor: (child: FullChild) => child.name },
        { header: "DNI", accessor: (child: FullChild) => child.dni },
        {
            header: "Estado", accessor: (child: FullChild) => {
                const hasGroup = Boolean(child.group || child.groupId);
                const isActive = child.active && hasGroup;

                return (
                    <div className={`relative flex items-center w-14 h-7 rounded-full p-1 transition-colors ${isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                        <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${isActive ? 'translate-x-7' : 'translate-x-0'}`} />
                        <span className={`absolute text-[10px] text-white font-bold transition-opacity duration-300 ${isActive ? 'left-2' : 'right-2'}`}>
                            {isActive ? "ON" : "OFF"}
                        </span>
                    </div>
                );
            }
        },
        {
            header: "Grupo", accessor: (child: FullChild) => {
                const groupName = child.group?.name ?? 'Sin grupo';
                const groupId = child.group?._id;

                if (!groupId) {
                    return (
                        <span className="text-gray-400 font-medium text-sm">
                            {groupName}
                        </span>
                    );
                }

                return (
                    <button
                        onClick={() => navigate(`/groups/${groupId}`)}
                        className="bg-sky-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-sky-600 transition text-sm font-semibold"
                    >
                        {groupName}
                    </button>
                );
            }
        },
        {
            header: "Acciones", accessor: (child: FullChild) => (
                <div className="flex gap-2">
                    {/* Botón Ver Detalle (Ojo) */}
                    <button
                        onClick={() => {
                            setSelectedChild(child);
                            setIsEditingMode(false);
                        }}
                        className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition"
                        title="Ver detalle"
                    >
                        <Eye size={18} />
                    </button>

                    {/* Botón Editar (Lápiz) */}
                    <button
                        onClick={() => {
                            setSelectedChild(child);
                            setIsEditingMode(true);
                        }}
                        className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition"
                        title="Editar chico"
                    >
                        <Pencil size={18} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col p-8 px-6">
            <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">LISTA</h2>
            <h3 className="text-4xl font-bold text-blue-500 mb-8 drop-shadow-sm text-left">Exploradores</h3>

            <List<FullChild>
                data={children ?? []}
                columns={columns}
                onSearch={(term) => console.log("Searching:", term)}
                onAdd={() => navigate("/chicos/nuevo")}
                buttonLabel=""
            />

            {/* Modal Unificado */}
            {selectedChild && (
                <ChildDetailModal
                    key={selectedChild._id}
                    child={selectedChild}
                    initialEditing={isEditingMode}
                    onClose={() => setSelectedChild(null)}
                />
            )}
        </div>
    );
}