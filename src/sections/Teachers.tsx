"use client";
import { useState } from "react"; // Necesitamos esto para el Modal
import { List } from "../components/UI/List";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Modal } from "../components/UI/Modal";

export default function Teachers() {
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const teachers = useQuery(api.teachers.queries.listTeachers);

  const columns = [
    { header: "Nombre", accessor: (t: any) => t.name },
    { header: "Grupo", accessor: (t: any) => t.nombreGrupo || "Sin grupo" },
    { 
      header: "Acciones", 
      accessor: (t: any) => (
        <button 
          onClick={() => setSelectedTeacherId(t._id)} // Al hacer clic, guardamos el ID
          className="text-pink-600 font-bold"
        >
          Más info
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
            title="Detalle de la Señorita" 
            isOpen={!!selectedTeacherId} 
            onClose={() => setSelectedTeacherId(null)}
          >
          {/* Aquí pasamos los datos. Sustituir esto por el resultado del useQuery */}
            <div>
              <p><strong>Nombre:</strong> Karen</p>
              <p><strong>Grupos:</strong> Grupo A, Grupo B</p>
              <p><strong>Pagos Recibidos:</strong> $500, $300</p>
              <p><strong>Facturas:</strong> Pago de materiales, Salario</p>
            </div>
          </Modal>
        )}
      </>
  );
}