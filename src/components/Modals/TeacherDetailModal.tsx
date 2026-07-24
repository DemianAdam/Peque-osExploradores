import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { FullTeacher } from "../../../convex/teachers/types";
import { Group } from "../../../convex/groups/types";
import { Modal } from "../UI/Modal";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface TeacherDetailModalProps {
  teacher: FullTeacher;
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherDetailModal({ teacher, isOpen, onClose }: TeacherDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<Group[]>(teacher.groups);
  const [selectValue, setSelectValue] = useState("");

  const allGroups = useQuery(api.groups.queries.getGroups);
  const setTeacherGroups = useMutation(api.group_teachers.mutations.setTeacherGroups);

  const assignedGroupIds = new Set(selectedGroups.map(g => g._id));
  const availableGroups = allGroups?.filter(g => !assignedGroupIds.has(g._id));

  const handleAddGroup = (groupId: string) => {
    const group = allGroups?.find(g => g._id === groupId);
    if (group) setSelectedGroups(prev => [...prev, group]);
    setSelectValue("");
  };

  const handleFinishEditing = async () => {
    await setTeacherGroups({ teacherId: teacher._id, groupIds: selectedGroups.map(g => g._id) });
    setIsEditing(false);
  };

  return (
    <Modal title={`Grupos de ${teacher.name}`} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">

        <div className="bg-gray-50 border rounded-xl p-4 flex flex-wrap gap-2">
          {selectedGroups.map(g => (
            <span
              key={g._id}
              className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {g.name}
              {isEditing && (
                <button
                  onClick={() => setSelectedGroups(prev => prev.filter(p => p._id !== g._id))}
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
              className="border p-2 rounded-lg flex-1 text-sm"
              value={selectValue}
              onChange={(e) => handleAddGroup(e.target.value)}
            >
              <option value="" disabled>Asignar nuevo grupo...</option>
              {availableGroups?.map(g => (
                <option key={g._id} value={g._id}>{g.name}</option>
              ))}
            </select>
          </div>
        )}

      <button
          onClick={() => isEditing ? handleFinishEditing() : setIsEditing(true)}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold transition ${
              isEditing 
              ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm" // <--- Verde fuerte y letra blanca
              : "bg-green-100 text-green-700 hover:bg-green-200"
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
