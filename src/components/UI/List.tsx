import { Plus } from "lucide-react";
import React from "react";

interface Column<T> {
  header: string;
  accessor: (item: T, index: number) => React.ReactNode;
}

interface ListProps<T extends { _id: string }> {
  
  data: T[] | undefined;
  columns: Column<T>[];
  onSearch: (term: string) => void;
  onAdd?: () => void; // Nueva propiedad opcional
  buttonLabel?: string; // Nueva propiedad opcional para el texto del botón
  
}

export function List<T extends { _id: string }>({ data, columns, onSearch, onAdd, buttonLabel= "Agregar"}: ListProps<T>) {
  return (
    <div className="p-6 bg-white rounded-[30px] shadow-sm border border-gray-100">
      <div className="flex justify-end items-center mb-6">
        
        {onAdd && (
            <button 
              onClick={onAdd}
              className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all"
            >
              <Plus size={20} /> {buttonLabel}
            </button>
          )}
      </div>
        {/* Search Input */}
      <input 
        type="text" 
        placeholder="Buscar..." 
        className="w-full p-3 border border-gray-200 rounded-xl mb-6 bg-gray-50"
        onChange={(e) => onSearch(e.target.value)}
      />

    
      {/* Table */}
      <div className="w-full">
        <table className="hidden md:table w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((col, i) => <th key={i} className=" p-4 font-semibold text-gray-700">{col.header}</th>)}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={i} className="border-b border-gray-50 last:border-b-0 even:bg-gray-50/50 transition-colors">
                {/* Ya no hay <td> manual aquí */}
                {columns.map((col, j) => (
                  <td key={j} className="p-4">{col.accessor(item, i)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
          {/* MODO MÓVIL (Tarjetas Dinámicas) */}
        <div className="md:hidden flex flex-col gap-4">
          {data?.map((item, i) => (
            <div key={item._id} className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-500 flex flex-col gap-2">
              {columns.map((col, j) => (
                <div key={j} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-0">
                  <span className="font-semibold text-gray-500 text-sm">{col.header}:</span>
                  <span className="">{col.accessor(item, i)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}