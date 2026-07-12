import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { FullTeacher } from "../../../convex/teachers/types";
import { Modal } from "../UI/Modal";

interface TeacherDetailModalProps {
  teacher: FullTeacher;
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherDetailModal({ teacher, isOpen, onClose }: TeacherDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  // HOLA DEMIAN:
  // 1. Cuando tengas la mutación de borrar, reemplaza el onClick abajo.
  // 2. Cuando tengas la mutación de agregar, la conectaremos al 'select'.
  
  return (
    <Modal title={`Grupos de ${teacher.name}`} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        
        {/* Lista de Grupos  */}
        <div className="flex flex-wrap gap-2">
          {teacher.groups.map((grupo) => (
            <span 
              key={grupo._id} 
              className="bg-sky-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2"
            >
              {grupo.name}
              {isEditing && (
                <button 
                  onClick={() => console.log("Demian, ejecutar mutación removeGroup con ID:", grupo._id)} 
                  className="font-bold hover:text-red-200"
                >
                  ×
                </button>
              )}
            </span>
          ))}
        </div>

        {/* Selector de Asignación (Solo visible al editar) */}
        {isEditing && (
          <div className="flex gap-2">
            <select 
              className="border p-2 rounded-lg flex-1 text-sm"
              onChange={(e) => console.log("Demian, ejecutar mutación addGroup con ID:", e.target.value)}
              value=""
            >
              <option value="" disabled>Asignar nuevo grupo...</option>
              
            </select>
          </div>
        )}

        {/* Botón de Acción */}
        <button 
          onClick={() => setIsEditing(!isEditing)}
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