import { useQuery } from "convex/react";
import { List } from "../components/UI/List";
import { api } from "../../convex/_generated/api";
import { FullChildren } from "../../convex/childrens/types";

export default function Childrens() {
    const childrens = useQuery(api.childrens.queries.getChildrens);

    const columns = [
        { header: "Nombre", accessor: (child: FullChildren) => child.name },
        { header: "Estado", accessor: (child: FullChildren) => child.active ? "Activo" : "Inactivo" },
        { header: "Grupo", accessor: (child: FullChildren) => child.group },
        { header: "Acciones", accessor: (child: FullChildren) => <button>Editar</button> }
    ];

    return (
        <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col pt-8 px-6">
            <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-right">LISTA</h2>
            <h3 className="text-4xl font-bold text-orange-500 mb-8 drop-shadow-sm text-right">Chicos</h3>
            <List
                title="Lista de Chicos"
                data={childrens}
                columns={columns}
                onSearch={(term) => console.log("Searching:", term)}
            />

        </div>
    );

}