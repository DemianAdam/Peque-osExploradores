"use client";
import { useNavigate } from "react-router";
import { useState } from "react";
import { List } from "../components/UI/List";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Eye, Trash2 } from "lucide-react";
import { GroupDetailModal } from "@/components/Modals/GroupDetailModal";
import { FullGroup } from "../../convex/groups/types";


export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState<FullGroup | null>(null); // Estado para el modal
  const navigate = useNavigate();
  const groups = useQuery(api.groups.queries.getFullGroups);

  const columns = [
    { header: "N°", accessor: (_: FullGroup, index: number) => index + 1 },
    { header: "Nombre Grupo", accessor: (g: FullGroup) => g.name },
    {
      header: "Chicos", accessor: (g: FullGroup) => {
        return `${g.children.length} asignados`;
      }
    },
    {
      header: "Seños", accessor: (g: FullGroup) => {
        return `${g.teachers.length} asignadas`;
      }
    },
    {
      header: "Acciones", accessor: (g: FullGroup) => (
        <div className="flex gap-2">
          <button
            // AQUÍ CAMBIAMOS EL NAVIGATE POR EL SETSTATE
            onClick={() => setSelectedGroup(g)}
            className="bg-sky-100 text-sky-600 p-2 rounded-full hover:bg-sky-200 transition"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => console.log("Eliminar", g._id)}
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
        <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-right">LISTA</h2>
        <h3 className="text-4xl font-bold text-blue-500 mb-8 drop-shadow-sm text-right">Grupos</h3>

      <List<FullGroup>
        title="Lista de Grupos"
        data={groups ?? []}
        columns={columns}
        onSearch={(term) => console.log("Buscando:", term)}
        onAdd={() => navigate("/grupos/nuevo")}
        buttonLabel=""
      />

      {selectedGroup && (
        <GroupDetailModal
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}
        />
      )}
    </div>

  );
}