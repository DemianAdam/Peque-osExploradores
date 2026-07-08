"use client";
import { useNavigate } from "react-router";
import { useState } from "react";
import { List } from "../components/UI/List";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Modal } from "../components/UI/Modal";
import { Eye } from "lucide-react";

export default function Teachers() {
  const navigate = useNavigate();
  const groups = ["Blue", "Red", "Green"];
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const teachers = useQuery(api.teachers.queries.listTeachers);

  const columns = [
    { header: "N°", accessor: (_: any, index: number) => index + 1 },
    { header: "Nombre", accessor: (t: any) => t.name },
    
    { 
      header: "Grupos", 
      accessor: (t: any) => (
        <button 
          key={t._id}
          onClick={() => setSelectedTeacherId(t._id)} // Al hacer clic, guardamos el ID
          className="bg-orange-100 text-pink-600 px-3 py-1 rounded-full font-bold hover:bg-orange-200"
        >
          <Eye size={18} />
        </button>
      ) 
    }
  ];

  return (
    <>
      <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col pt-8 px-6">
        <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-right">LISTA</h2>
        <h3 className="text-4xl font-bold text-pink-500 mb-8 drop-shadow-sm text-right">Señoritas</h3>
        <List 
          title="Lista de Señoritas"
          data={teachers ?? []}
          columns={columns}
          onSearch={(term) => console.log(term)}
        />
      
       
        </div>

        {selectedTeacherId && (
        <Modal 
          title="Detalle de Grupos" 
          isOpen={!!selectedTeacherId} 
          onClose={() => setSelectedTeacherId(null)}
        >
          <div className="flex flex-col gap-3">
            <p className="text-gray-600">Grupos asignados a esta docente:</p>
          
            <div className="flex flex-wrap gap-2">
              {groups?.map((grupo: string) => (
                <button
                  key={grupo}
                  onClick={() => navigate(`/grupos/${grupo}`)} // Redirección al detalle del grupo
                  className="bg-sky-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-sky-600 transition"
                >
                  {grupo}
                </button>
              ))}
            </div>
          </div>
        </Modal>
      )}
        
      </>
  );
}