import { useQuery } from "convex/react";
import { List } from "../../components/UI/List";
import { api } from "../../../convex/_generated/api";
import { FullChild } from "../../../convex/children/types";
import { useNavigate } from "react-router";
import { Pencil } from "lucide-react";

export default function Children() {
    
    const children = useQuery(api.children.queries.getChildren);
    const navigate = useNavigate();
    const columns = [
        { header: "N°", accessor: (_: FullChild, index: number) => index + 1 },
        { header: "Nombre", accessor: (child: FullChild) => child.name },
        { header: "DNI", accessor: (child: FullChild) => child.dni },
        { header: "Estado", accessor: (child: FullChild) => (
            <div className={`relative flex items-center w-14 h-7 rounded-full p-1 transition-colors ${child.active ? 'bg-green-500' : 'bg-red-500'}`}>
      
                {/* El círculo que se mueve */}
                <div className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 ${child.active ? 'translate-x-7' : 'translate-x-0'}`} />
                
                {/* El texto con posición absoluta para que no choque con el círculo */}
                <span className={`absolute text-[10px] text-white font-bold transition-opacity duration-300 ${child.active ? 'left-2' : 'right-2'}`}>
                    {child.active ? "ON" : "OFF"}
                </span>
                
            </div>
        )},
        { header: "Grupo", accessor: (child: FullChild) => {
            const groupName = child.group?.name ?? 'Sin grupo';
            const groupId = child.group?._id;
            return (
                <button 
                    onClick={() => groupId && navigate(`/groups/${groupId}`)}
                    className="bg-sky-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-sky-600 transition text-sm font-semibold"
                    disabled={!groupId}
                >
                    {groupName}
                </button>
            )
        }},
        { header: "Acciones", accessor: (child: FullChild) => 
            <button 
                onClick={() => navigate(`/chicos/editar/${child._id}`)} 
                className="bg-orange-100 text-pink-600 px-4 py-1 rounded-full font-bold hover:bg-orange-200 transition"
            >
                <Pencil size={18} />
            </button>
         }
    ];

    return (
        <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col pt-8 px-6">
            <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-right">LISTA</h2>
            <h3 className="text-4xl font-bold text-orange-500 mb-8 drop-shadow-sm text-right">Chicos</h3>
            
            
            <List
                title="Lista de Chicos"
                data={children}
                columns={columns}
                onSearch={(term) => console.log("Searching:", term)}
                onAdd={() => navigate("/chicos/nuevo")}
                buttonLabel=""
            />

        </div>
    );

}