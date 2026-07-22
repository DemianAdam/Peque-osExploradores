"use client";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Eye, Trash2 } from "lucide-react";
import { api } from "../../../convex/_generated/api";
import { FullGroup } from "../../../convex/groups/types";
import { List } from "@/components/UI/List";
import { GroupDetailModal } from "@/components/Modals/GroupDetailModal";
import { GroupDeleteModal } from "@/components/Modals/GroupDeleteModal";



export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState<FullGroup | null>(null); // Estado para el modal
  const [groupToDelete, setGroupToDelete] = useState<FullGroup | null>(null);
  const navigate = useNavigate();
  const groups = useQuery(api.groups.queries.getFullGroups);
  const deleteGroupMutation = useMutation(api.groups.mutations.deleteGroup);
  const handleDeleteConfirm = async () => {
    if (!groupToDelete) return;
    
    try {
      // 3. Ejecutamos la mutación pasando el ID como lo pide el validador
      await deleteGroupMutation({ id: groupToDelete._id });
      
      // Si todo sale bien, cerramos el modal
      setGroupToDelete(null);
    } catch (error) {
      // Si el grupo tiene chicos asignados o salta algún error del backend, lo atrapamos acá
      console.error("No se pudo eliminar el grupo:", error);
      alert("No se puede eliminar el grupo porque tiene chicos asignados o ocurrió un error.");
    }
  };


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
            onClick={() => setGroupToDelete(g)}
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
        <h3 className="text-4xl font-bold text-blue-500 mb-8 drop-shadow-sm text-left">Grupos</h3>

      <List<FullGroup>
        data={groups ?? []}
        columns={columns}
        onSearch={(term) => console.log("Buscando:", term)}
        onAdd={() => navigate("/grupos/nuevo")}
        buttonLabel=""
      />

      {selectedGroup && (
        <GroupDetailModal
          group={selectedGroup}
          onClose={() => setSelectedGroup(null)}       />
      )}
      
      {/* Modal de Eliminación */}
      <GroupDeleteModal
        isOpen={!!groupToDelete}
        onClose={() => setGroupToDelete(null)}
        onConfirm={handleDeleteConfirm}
        groupName={groupToDelete?.name ?? ""}
      />
    </div>

  );
}