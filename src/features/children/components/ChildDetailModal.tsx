import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { FullChild } from "@shared/types/convex";
import { Modal } from "@ui/Modal";
import { useQuery, useMutation } from "convex/react";
import { api } from "@convex/_generated/api";

interface ChildDetailModalProps {
  child: FullChild;
  onClose: () => void;
  initialEditing?: boolean;
}

export function ChildDetailModal({ child, onClose, initialEditing = false }: ChildDetailModalProps) {
  const [isEditing, setIsEditing] = useState(initialEditing);
  
  // Estado único para los campos del formulario de edición del explorador
  const [formData, setFormData] = useState({
    name: child.name,
    dni: child.dni,
    active: child.active,
    groupId: child.group?._id as string | undefined,
    currentGroupName: child.group?.name,
  });

  // Estados de errores por campo
  const [errors, setErrors] = useState({
    name: "",
    dni: "",
    groupId: "",
  });

  const allGroups = useQuery(api.groups.queries.getGroups);
  const updateChild = useMutation(api.children.mutations.updateChild);

  const handleActiveToggle = () => {
    const nextActive = !formData.active;
    setFormData(prev => ({
      ...prev,
      active: nextActive,
      groupId: nextActive ? prev.groupId : undefined,
      currentGroupName: nextActive ? prev.currentGroupName : undefined,
    }));
    if (!nextActive) {
      setErrors(prev => ({ ...prev, groupId: "" }));
    }
  };

  const handleSave = async () => {
    const newErrors = { name: "", dni: "", groupId: "" };
    let isValid = true;

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "El nombre del explorador es obligatorio.";
      isValid = false;
    }

    if (!formData.dni || !formData.dni.trim()) {
      newErrors.dni = "El DNI es obligatorio.";
      isValid = false;
    }

    if (formData.active && !formData.groupId) {
      newErrors.groupId = "Debe seleccionar un grupo.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    try {
      await updateChild({ 
        id: child._id, 
        name: formData.name, 
        dni: formData.dni, 
        active: formData.active,
        groupId: formData.groupId
      });
    } catch (error) {
      alert("No se pudo guardar el explorador.");
      return;
    }

    setIsEditing(false); // Vuelve al modo detalle mostrando los cambios sincronizados
  };

  return (
    <Modal 
      title={
        isEditing ? (
          <span className="text-emerald-600 font-bold">Editar Explorador</span>
        ) : (
          <span className="text-blue-500 font-bold">Detalle de {formData.name}</span>
        )
      } 
      isOpen={!!child} 
      onClose={onClose}
    >
      <div className="flex flex-col gap-6">

        {/* Campo Nombre */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Nombre</label>
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500"}`}>
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

        {/* Campo DNI */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">DNI</label>
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500"}`}>
            {isEditing ? (
              <input
                value={formData.dni}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, dni: e.target.value }));
                  if (errors.dni) setErrors({ ...errors, dni: "" });
                }}
                className="w-full bg-transparent outline-none font-bold text-slate-800"
              />
            ) : (
              <p className="text-lg font-medium text-slate-800">{formData.dni}</p>
            )}
          </div>
          {isEditing && errors.dni && (
            <span className="text-red-500 text-xs font-semibold ml-1">{errors.dni}</span>
          )}
        </div>

        {/* Campo Estado */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Estado</label>
          <div className={`border rounded-xl p-4 transition-colors flex items-center justify-between ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500"}`}>
            {isEditing ? (
              <button
                type="button"
                onClick={handleActiveToggle}
                className={`relative flex items-center w-14 h-7 rounded-full p-1 transition-colors ${formData.active ? 'bg-green-500' : 'bg-red-500'}`}
              >
                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${formData.active ? 'translate-x-7' : 'translate-x-0'}`} />
                <span className={`absolute text-[10px] text-white font-bold transition-opacity duration-300 ${formData.active ? 'left-2' : 'right-2'}`}>
                  {formData.active ? "ON" : "OFF"}
                </span>
              </button>
            ) : (
              <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${formData.active ? 'bg-green-500' : 'bg-red-500'}`}>
                {formData.active ? "ACTIVO (ON)" : "INACTIVO (OFF)"}
              </span>
            )}
          </div>
        </div>

        {/* Campo Grupo Asignado */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Grupo Asignado</label>
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500"}`}>
            {isEditing ? (
              formData.active ? (
                <select
                  className="w-full bg-transparent outline-none font-medium text-slate-800 cursor-pointer"
                  value={formData.groupId ?? ""}
                  onChange={(e) => {
                    const selectedId = e.target.value || undefined;
                    const foundGroup = allGroups?.find((g: { _id: string; name: string }) => g._id === selectedId);
                    
                    setFormData(prev => ({
                      ...prev,
                      groupId: selectedId,
                      currentGroupName: foundGroup?.name,
                    }));

                    if (errors.groupId) setErrors({ ...errors, groupId: "" });
                  }}
                >
                  <option value="">Sin grupo asignado</option>
                  {allGroups?.map((group: { _id: string; name: string }) => (
                    <option key={group._id} value={group._id}>
                      {group.name}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-sm font-medium text-gray-400 italic">
                  Sin grupo asignado (Inactivo / OFF)
                </p>
              )
            ) : (
              <p className="text-lg font-medium text-slate-700">
                {formData.currentGroupName ?? 'Sin grupo asignado'}
              </p>
            )}
          </div>
          {isEditing && formData.active && errors.groupId && (
            <span className="text-red-500 text-xs font-semibold ml-1">{errors.groupId}</span>
          )}
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
            <><Pencil size={16}/> Editar Explorador</>
          )}
        </button>

      </div>
    </Modal>
  );
}