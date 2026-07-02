import { List } from "../components/UI/List";

export default function Childrens() {
    const children: any[] = [];
    const columns = [
    { header: "Nombre", accessor: (child: any) => child.name },
    { header: "Estado", accessor: (child: any) => child.active ? "Activo" : "Inactivo" },
    { header: "Acciones", accessor: (child: any) => <button>Editar</button> }
  ];
  
  return (
    <div className="min-h-screen w-full bg-[#C6E5D9] flex flex-col pt-8 px-6">
        <h2 className="font-angkor text-[40px] text-[#1E293B] font-normal mb-2 text-right">LISTA</h2>
        <h3 className="text-4xl font-bold text-green-500 mb-8 drop-shadow-sm text-right">Chicos</h3>
        <List 
            title="Lista de Chicos"
            data={children}
            columns={columns}
            onSearch={(term) => console.log("Searching:", term)}
        />

    </div>
  );

  }