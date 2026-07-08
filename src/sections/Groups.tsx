"use client";
import { useNavigate } from "react-router";
import { List } from "../components/UI/List";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Eye, Trash2 } from "lucide-react";

export default function Groups() {
  const navigate = useNavigate();
  // Esta es la query que se encuentra disponible
  const groups = useQuery(api.groups.queries.getGroups);

  const columns = [
    { header: "N°", accessor: (_: any, index: number) => index + 1 },
    { header: "Nombre Grupo", accessor: (g: any) => g.name },
    
    // Mostramos la cantidad de chicos y seños
    { header: "Chicos", accessor: (g: any) => `${g.childrens?.length || 0} asignados` },
    { header: "Seños", accessor: (g: any) => `${g.teachers?.length || 0} asignadas` },

    { header: "Acciones", accessor: (g: any) => (
        <div className="flex gap-2"> {/* Contenedor flex para separar los botones */}
        {/* Botón Ver */}
        <button 
            onClick={() => navigate(`/grupos/${g._id}`)} 
            className="bg-sky-100 text-sky-600 p-2 rounded-full hover:bg-sky-200 transition"
            title="Ver detalles"
        >
            <Eye size={18} />
        </button>

        {/* Botón Eliminar */}
        <button 
            onClick={() => console.log("Eliminar", g._id)} // Aquí iría tu lógica de borrado
            className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200 transition"
            title="Eliminar grupo"
        >
            <Trash2 size={18} />
        </button>
        </div>
    )}
  ];

  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col pt-8 px-6">
      <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-right">LISTA</h2>
      <h3 className="text-4xl font-bold text-orange-500 mb-8 drop-shadow-sm text-right">Grupos</h3>
      
      <List 
        title="Lista de Grupos"
        data={groups ?? []}
        columns={columns}
        onSearch={(term) => console.log("Buscando:", term)}
        onAdd={() => navigate("/grupos/nuevo")}
        buttonLabel=""
      />
    </div>
  );
}