"use client";
import { useNavigate } from "react-router";
import { useState } from "react";
import { List } from "../components/UI/List";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Eye, Trash2 } from "lucide-react";
import { GroupDetailModal } from "@/components/Modals/GroupDetailModal";


export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState<any>(null); // Estado para el modal
  const navigate = useNavigate();
  const groups = useQuery(api.groups.queries.getGroups);
  const allChildren = useQuery(api.children.queries.getChildren);
  const allGroupTeachers = useQuery(api.groups.queries.getAllGroupTeachers);
  const allTeachers = useQuery(api.teachers.queries.listTeachers);

  const columns = [
    { header: "N°", accessor: (_: any, index: number) => index + 1 },
    { header: "Nombre Grupo", accessor: (g: any) => g.name },
    
    // Mostramos la cantidad de chicos y seños
   // 2. Chicos: Filtramos buscando el ID del grupo en los hijos
    { header: "Chicos", accessor: (g: any) => {
        const count = allChildren?.filter(c => c.groupId === g._id).length || 0;
        return `${count} asignados`;
      } 
    },
    { 
      header: "Seños", accessor: (g: any) => {
        const count = allGroupTeachers?.filter((gt: { groupId: string }) => gt.groupId === g._id).length || 0;
        return `${count} asignadas`;
      } 
    },
    { header: "Acciones", accessor: (g: any) => (
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
    )}
  ];

 return (
    
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col pt-8 px-6">
      {/* ... tus encabezados ... */}
      
      <List 
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
          allChildren={allChildren || []}
          allGroupTeachers={allGroupTeachers || []}
          allTeachers={allTeachers || []}
        />
      )}
    </div>

  );
}