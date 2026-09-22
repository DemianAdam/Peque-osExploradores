"use client";
import { useState } from "react";
import { List } from "@ui/List";
import { api } from "@convex/_generated/api";
import { useQuery } from "convex/react";

import { Eye } from "lucide-react";
import { TeacherDetailModal } from "@features/teachers/components/TeacherDetailModal";
import { FullTeacher } from "@shared/types/convex";

export default function Teachers() {
  const [selectedTeacher, setSelectedTeacher] = useState<FullTeacher | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const teachers = useQuery(api.teachers.queries.getTeachers);

  const filteredTeachers = teachers?.filter(teacher => {
    const term = searchTerm.toLowerCase();
    return teacher.name.toLowerCase().includes(term);
  });

  
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
      <div className="w-full flex flex-col p-8 px-6">
        <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-left">LISTA</h2>
        <h3 className="text-4xl font-bold text-pink-500 mb-8 drop-shadow-sm text-left">Seños</h3>
        <List<FullTeacher>
          data={filteredTeachers ?? []}
          columns={columns}
          onSearch={setSearchTerm}
        />
      
        {selectedTeacher && (
          <TeacherDetailModal 
            key={selectedTeacher._id}
            teacher={selectedTeacher}
            isOpen={!!selectedTeacher}
            onClose={() => setSelectedTeacher(null)}
          />
        )}
      </div>
        
      </>
  );
}