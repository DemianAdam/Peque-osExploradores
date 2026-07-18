import { Pencil, Check, X } from "lucide-react";
import { useState } from "react";
import { FullGroup } from "../../../convex/groups/types";
import { Modal } from "../UI/Modal";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";


interface GroupDetailModalProps {
  group: FullGroup;
  onClose: () => void;
}

export function GroupDetailModal({ group, onClose }: GroupDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(group.name);
  
  const allTeachers = useQuery(api.teachers.queries.listTeachers);

  const availableTeachers = allTeachers?.filter(
    (t) => !group.teachers.some((gt) => gt._id === t._id)
  );

  return (
    <Modal title="Detalle del grupo" isOpen={!!group} onClose={onClose}>
      <div className="flex flex-col gap-6">

        {/* SECCIÓN NOMBRE */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-500">Nombre del Grupo</label>
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500 rounded-xl p-4"}`}>
            {isEditing ? (
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-transparent outline-none font-bold text-slate-800"
              />
            ) : (
              <h2 className="text-2xl font-bold text-slate-800">{name}</h2>
            )}
          </div>
        </div>

        {/* SECCIÓN INTEGRANTES */}
        <div className="flex flex-col gap-4">
          <label className="text-sm font-semibold text-gray-500">Integrantes</label>
          
          {/* CHICOS */}
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

          {/* SEÑOS */}
          <div className={`border rounded-xl p-4 transition-colors ${isEditing ? "bg-emerald-50 border-emerald-200" : "bg-gray-50 border border-gray-500 rounded-xl p-4"}`}>
            <h3 className="font-semibold text-gray-700 mb-2">Seños ({group.teachers.length})</h3>
            <div className="flex flex-wrap gap-2">
              {group.teachers.map(t => (
                <span key={t._id} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                  {t.name}
                  {isEditing && (
                    <button onClick={() => {
                      // TODO: Demian, ejecutar mutación removeTeacher con ID: t._id
                    }}>
                      <X size={14} />
                    </button>
                  )}
                </span>
              ))}
            </div>

            {isEditing && (
              <select 
                className="mt-4 w-full border border-emerald-300 p-2 rounded-lg text-sm bg-white"
                onChange={(e) => {
                  // TODO: Demian, ejecutar mutación addTeacher con ID: e.target.value
                }}
                value=""
              >
                <option value="" disabled>+ Asignar otra seño...</option>
                {availableTeachers?.map(t => (
                  <option key={t._id} value={t._id}>{t.name}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* BOTÓN DE ACCIÓN */}
        <button 
          onClick={() => {
            if (isEditing) {
               // TODO: Demian, ejecutar mutación para actualizar nombre y guardar cambios: name
            }
            setIsEditing(!isEditing);
          }}
          className={`flex items-center justify-center gap-2 w-full py-2 rounded-lg text-sm font-semibold transition ${
            isEditing ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-sky-100 text-sky-700 hover:bg-sky-200"
          }`}
        >
          {isEditing ? (
            <><Check size={16}/> Finalizar Edición</>
          ) : (
            <><Pencil size={16}/> Editar</>
          )}
        </button>

      </div>
    </Modal>
  );
}