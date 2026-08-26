import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { FullTeacher } from "@shared/types/convex";
import { Modal } from "@ui/Modal";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

interface TeacherDetailModalProps {
  teacher: FullTeacher;
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherDetailModal({ teacher, isOpen, onClose }: TeacherDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Estado único para los campos del formulario de edición de grupos del docente
  const [formData, setFormData] = useState({
    selectedGroups: teacher.groups,
    selectValue: "",
  });

  const allGroups = useQuery(api.groups.queries.getGroups);
  const setTeacherGroups = useMutation(api.group_teachers.mutations.setTeacherGroups);

  const assignedGroupIds = new Set(formData.selectedGroups.map((g: { _id: string }) => g._id));
  const availableGroups = allGroups?.filter((g: { _id: string; name: string }) => !assignedGroupIds.has(g._id));

  const handleAddGroup = (groupId: string) => {
    const group = allGroups?.find((g: { _id: string; name: string }) => g._id === groupId);
    if (group) {
      setFormData(prev => ({
        ...prev,
        selectedGroups: [...prev.selectedGroups, group],
        selectValue: "",
      }));
    }
  };

  const handleRemoveGroup = (groupId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedGroups: prev.selectedGroups.filter(p => p._id !== groupId),
    }));
  };

  const handleFinishEditing = async () => {
    try {
      await setTeacherGroups({ 
        teacherId: teacher._id, 
        groupIds: formData.selectedGroups.map(g => g._id) 
      });
    } catch (error) {
      console.error("No se pudo guardar los grupos:", error);
      alert("No se pudo guardar los grupos.");
      return;
    }
    setIsEditing(false);
  };

  return (
    <Modal 
      title={
        isEditing ? (
          <span className="text-emerald-600 font-bold">Editar Grupos</span>
        ) : (
          <span className="text-pink-500 font-bold">Grupos de {teacher.name}</span>
        )
      } 
      isOpen={isOpen} 
      onClose={onClose}
    >

      <div className="flex flex-col gap-4">

        <div className="bg-gray-50 border rounded-xl p-4 flex flex-wrap gap-2">
          {formData.selectedGroups.map((g: { _id: string; name: string }) => (
            <span
              key={g._id}
              className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {g.name}
              {isEditing && (
                <button
                  type="button"
                  onClick={() => handleRemoveGroup(g._id)}
                  className="font-bold hover:text-red-200"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>

        {isEditing && (
          <div className="flex gap-2">
            <select
              className="border p-2 rounded-lg flex-1 text-sm bg-white"
              value={formData.selectValue}
              onChange={(e) => handleAddGroup(e.target.value)}
            >
              <option value="" disabled>Asignar nuevo grupo...</option>
              {availableGroups?.map((g: { _id: string; name: string }) => (
                <option key={g._id} value={g._id}>{g.name}</option>
              ))}
            </select>
          </div>
        )}

      <button
          onClick={() => isEditing ? handleFinishEditing() : setIsEditing(true)}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold transition ${
              isEditing 
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
              : "bg-pink-100 text-pink-700 hover:bg-pink-200"
          }`}
        >
          {isEditing ? (
              <><Check size={16}/> Finalizar Edición</>
          ) : (
              <><Pencil size={16}/> Editar grupos</>
          )}
      </button>

      </div>
    </Modal>
  );
}