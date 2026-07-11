import { Pencil, Check, X } from "lucide-react";
import { useState } from "react";
import { FullGroup } from "../../../convex/groups/types";
import { Modal } from "../UI/Modal";

interface GroupDetailModalProps {
  group: FullGroup;
  onClose: () => void;
}

export function GroupDetailModal({ group, onClose }: GroupDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Modal title={`Detalle del grupo: ${group.name}`} isOpen={!!group} onClose={onClose}>
      <div className="flex flex-col gap-6">

        {/* SECCIÓN NIÑOS (Espejo de datos) */}
        <div className="bg-gray-50 border rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Chicos ({group.children.length})</h3>
          <div className="flex flex-wrap gap-2">
            {group.children.map(c => (
              <span key={c._id} className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {c.name}
                {isEditing && (
                  <button onClick={() => console.log("Demian: mutación removeChild para:", c._id)}>
                    <X size={14} />
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* SECCIÓN SEÑOS (Espejo de datos) */}
        <div className="bg-gray-50 border rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Seños ({group.teachers.length})</h3>
          <div className="flex flex-wrap gap-2">
            {group.teachers.map(t => (
              <span key={t._id} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {t.name}
                {isEditing && (
                  <button onClick={() => console.log("Demian: mutación removeTeacher para:", t._id)}>
                    <X size={14} />
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold transition ${
            isEditing ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {isEditing ? (
            <><Check size={16}/> Finalizar Edición</>
          ) : (
            <><Pencil size={16}/> Editar integrantes</>
          )}
        </button>

      </div>
    </Modal>
  );
}