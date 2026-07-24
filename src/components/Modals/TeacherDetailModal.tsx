import { Pencil, Check } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { FullTeacher } from "../../../convex/teachers/types";
import { Modal } from "../UI/Modal";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

interface TeacherDetailModalProps {
  teacher: FullTeacher;
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherDetailModal({ teacher, isOpen, onClose }: TeacherDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGroupIds, setSelectedGroupIds] = useState<Id<"groups">[]>(() =>
    teacher.groups.map((g) => g._id)
  );
  const selectRef = useRef<HTMLSelectElement>(null);

  const allGroups = useQuery(api.groups.queries.getGroups);
  const setTeacherGroups = useMutation(api.group_teachers.mutations.setTeacherGroups);

  useEffect(() => {
    setSelectedGroupIds(teacher.groups.map((g) => g._id));
    setIsEditing(false);
  }, [teacher._id, isOpen]);

  const assignedGroupIds = new Set(selectedGroupIds);
  const availableGroups = allGroups?.filter((g) => !assignedGroupIds.has(g._id));

  const handleAddGroup = (groupId: Id<"groups">) => {
    setSelectedGroupIds((prev) => [...prev, groupId]);
    if (selectRef.current) selectRef.current.value = "";
  };

  const handleRemoveGroup = (groupId: Id<"groups">) => {
    setSelectedGroupIds((prev) => prev.filter((id) => id !== groupId));
  };

  const handleFinishEditing = async () => {
    await setTeacherGroups({ teacherId: teacher._id, groupIds: selectedGroupIds });
    setIsEditing(false);
  };

  return (
    <Modal title={`Grupos de ${teacher.name}`} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">

        <div className="bg-gray-50 border rounded-xl p-4 flex flex-wrap gap-2">
          {selectedGroupIds.map((groupId) => {
            const group = allGroups?.find((g) => g._id === groupId)
              ?? teacher.groups.find((g) => g._id === groupId);
            if (!group) return null;
            return (
              <span
                key={groupId}
                className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {group.name}
                {isEditing && (
                  <button
                    onClick={() => handleRemoveGroup(groupId)}
                    className="font-bold hover:text-red-200"
                  >
                    ×
                  </button>
                )}
              </span>
            );
          })}
        </div>

        {isEditing && (
          <div className="flex gap-2">
            <select
              ref={selectRef}
              className="border p-2 rounded-lg flex-1 text-sm"
              onChange={(e) => handleAddGroup(e.target.value as Id<"groups">)}
              defaultValue=""
            >
              <option value="" disabled>Asignar nuevo grupo...</option>
              {availableGroups?.map((g) => (
                <option key={g._id} value={g._id}>{g.name}</option>
              ))}
            </select>
          </div>
        )}

        <button
          onClick={() => {
            if (isEditing) {
              handleFinishEditing();
            } else {
              setIsEditing(true);
            }
          }}
          className={`flex items-center justify-center gap-2 mt-2 py-2 rounded-lg text-sm font-semibold transition ${
            isEditing ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-sky-100 text-sky-700 hover:bg-sky-200"
          }`}
        >
          {isEditing ? (
            <><Check size={16} /> Finalizar Edición</>
          ) : (
            <><Pencil size={16} /> Editar Grupos</>
          )}
        </button>

      </div>
    </Modal>
  );
}
