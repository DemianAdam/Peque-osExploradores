"use client";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { Eye, Trash2, Pencil } from "lucide-react";
import { api } from "@convex/_generated/api";
import { FullGroup } from "@shared/types/convex";
import { List } from "@ui/List";
import { GroupDetailModal } from "@features/groups/components/GroupDetailModal";
import { GroupDeleteModal } from "@features/groups/components/GroupDeleteModal";

export default function Groups() {
  const [selectedGroup, setSelectedGroup] = useState<FullGroup | null>(null);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<FullGroup | null>(null);
  const navigate = useNavigate();
  
  const groups = useQuery(api.groups.queries.getFullGroups);
  const deleteGroupMutation = useMutation(api.groups.mutations.deleteGroup);

  const handleDeleteConfirm = async () => {
    if (!groupToDelete) return;
    
    try {
      await deleteGroupMutation({ id: groupToDelete._id });
      setGroupToDelete(null);
    } catch (error) {
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
            onClick={() => {
              setSelectedGroup(g);
              setIsEditingMode(false); // Abre en modo detalle
            }}
            className="bg-blue-100 text-blue-600 p-2 rounded-full hover:bg-blue-200 transition"
            title="Ver detalle"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => {
              setSelectedGroup(g);
              setIsEditingMode(true); // Abre directo en edición
            }}
            className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200 transition"
            title="Editar grupo"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => setGroupToDelete(g)}
            className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
            title="Eliminar grupo"
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

      {/* Modal único unificado */}
      {selectedGroup && (
        <GroupDetailModal
          key={selectedGroup._id}
          group={selectedGroup}
          initialEditing={isEditingMode}
          onClose={() => setSelectedGroup(null)}      
        />
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