import { Pencil, Check, X } from "lucide-react";
import { useState } from "react";
import { FullGroup } from "../../../convex/groups/types";
import { Teacher } from "../../../convex/teachers/types";
import { Modal } from "../UI/Modal";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

interface GroupDetailModalProps {
  group: FullGroup;
  onClose: () => void;
  initialEditing?: boolean;
}

export function GroupDetailModal({ group, onClose, initialEditing = false }: GroupDetailModalProps) {
  const [isEditing, setIsEditing] = useState(initialEditing);

  // Estado único para los campos del formulario de edición del grupo
  const [formData, setFormData] = useState({
    name: group.name,
    selectedTeachers: group.teachers as Teacher[],
    selectValue: "",
  });

  // Estados de errores por campo
  const [errors, setErrors] = useState({
    name: "",
  });

  const allTeachers = useQuery(api.teachers.queries.getTeachers);
  const updateGroupWithTeachers = useMutation(api.groups.mutations.updateGroupWithTeachers);

  const assignedTeacherIds = new Set(formData.selectedTeachers.map(t => t._id));
  const availableTeachers = allTeachers?.filter(t => !assignedTeacherIds.has(t._id));

  const handleAddTeacher = (teacherId: string) => {
    const teacher = allTeachers?.find(t => t._id === teacherId);
    if (teacher) {
      setFormData(prev => ({
        ...prev,
        selectedTeachers: [...prev.selectedTeachers, teacher],
        selectValue: "",
      }));
    }
  };

  const handleRemoveTeacher = (teacherId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTeachers: prev.selectedTeachers.filter(p => p._id !== teacherId),
    }));
  };

  const handleSave = async () => {
    const newErrors = { name: "" };
    let isValid = true;

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    await updateGroupWithTeachers({
      id: group._id,
      name: formData.name,
      teacherIds: formData.selectedTeachers.map(t => t._id),
    });
    setIsEditing(false); // Vuelve al modo detalle al guardar con éxito
  };

  return (
    <Modal 
      title={
        isEditing ? (
          <span className="text-emerald-600 font-bold">Editar Grupo</span>
        ) : (
          <span className="text-blue-500 font-bold">Detalle del Grupo</span>
        )
      } 
      isOpen={!!group} 
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">

        {/* Nombre del Grupo */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Nombre del Grupo</label>
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500 rounded-xl p-4"}`}>
            {isEditing ? (
              <input
                value={formData.name}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, name: e.target.value }));
                  if (errors.name) setErrors({ ...errors, name: "" });
                }}
                className="w-full bg-transparent outline-none font-bold text-slate-800"
              />
            ) : (
              <h2 className="text-2xl font-bold text-slate-800">{formData.name}</h2>
            )}
          </div>
          {isEditing && errors.name && (
            <span className="text-red-500 text-xs font-semibold ml-1">{errors.name}</span>
          )}
        </div>

        {/* Integrantes */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-500">Integrantes</label>

          {/* Chicos */}
          <div className="bg-gray-50 border border-gray-500 rounded-xl p-4">
            <h3 className="font-semibold text-gray-700 mb-2">Chicos ({group.children.length})</h3>
            <div className="flex flex-wrap gap-2">
              {group.children.map(c => (
                <span key={c._id} className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">
                  {c.name}
                </span>
              ))}
            </div>
          </div>

          {/* Seños */}
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500 rounded-xl p-4"}`}>
            <h3 className="font-semibold text-gray-700 mb-2">Seños ({formData.selectedTeachers.length})</h3>
            <div className="flex flex-wrap gap-2">
              {formData.selectedTeachers.map(t => (
                <span key={t._id} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {t.name}
                  {isEditing && (
                    <button type="button" onClick={() => handleRemoveTeacher(t._id)}>
                      <X size={14} />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <select
                className="mt-4 w-full border border-emerald-300 p-2 rounded-lg text-sm bg-white"
                value={formData.selectValue}
                onChange={(e) => handleAddTeacher(e.target.value)}
              >
                <option value="" disabled>+ Asignar otra seño...</option>
                {availableTeachers?.map(t => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Botón de Acción */}
        <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold transition ${
                isEditing 
                ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                : "bg-blue-100 text-blue-700 hover:bg-blue-200"
            }`}
        >
            {isEditing ? (
                <><Check size={16}/> Finalizar Edición</>
            ) : (
                <><Pencil size={16}/> Editar Grupo</>
            )}
        </button>

      </div>
    </Modal>
  );
}