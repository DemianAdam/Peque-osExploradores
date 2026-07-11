"use client";
import { useState } from "react";
import { List } from "../components/UI/List";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

import { Eye } from "lucide-react";
import { TeacherDetailModal } from "@/components/Modals/TeacherDetailModal";
import { FullTeacher } from "../../convex/teachers/types";

export default function Teachers() {
  const [selectedTeacher, setSelectedTeacher] = useState<FullTeacher | null>(null);
  const teachers = useQuery(api.teachers.queries.listTeachers);

  
  const columns = [
    { header: "N°", accessor: (_: FullTeacher, index: number) => index + 1 },
    { header: "Nombre", accessor: (t: FullTeacher) => t.name },
    
    { 
      header: "Grupos", 
      accessor: (t: FullTeacher) => (
        <button 
          key={t._id}
          onClick={() => setSelectedTeacher(t)} // Al hacer clic, guardamos el ID
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
        <List<FullTeacher>
          title="Lista de Señoritas"
          data={teachers ?? []}
          columns={columns}
          onSearch={(term) => console.log(term)}
        />
      
       
        
        {selectedTeacher && (
          <TeacherDetailModal 
            teacher={selectedTeacher}
            isOpen={!!selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        )}
      </div>
        
      </>
  );
}