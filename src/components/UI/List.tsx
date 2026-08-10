import { Plus, Search } from "lucide-react";
import React from "react";

interface Column<T> {
  header: string;
  accessor: (item: T, index: number) => React.ReactNode;
}

interface ListProps<T extends { _id: string }> {
  
  data: T[] | undefined;
  columns: Column<T>[];
  onSearch: (term: string) => void;
  onAdd?: () => void; 
  buttonLabel?: string; 
  renderMobileItem?: (item: T, index: number) => React.ReactNode;
  searchPlaceholder?: string; 
  
}

export function List<T extends { _id: string }>({ data, columns, onSearch, onAdd, renderMobileItem, buttonLabel= "Agregar", searchPlaceholder= "Buscar..." }: ListProps<T>) {
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
      <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text" 
            placeholder={searchPlaceholder}
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-blue-400 transition shadow-sm"
            onChange={(e) => onSearch(e.target.value)}
          />
      </div>

    
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
        <div className="md:hidden flex flex-col gap-4 mt-4">
          {data?.map((item, i) => (
            renderMobileItem ? (
              // Si la sección (como Fees) provee su propio diseño, usamos solo eso
              <div key={item._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-3 relative overflow-hidden">
                {renderMobileItem(item, i)}
              </div>
            ) : (
              // Si no provee diseño (las demás secciones), usamos la tarjeta genérica antigua
              <div key={item._id} className="bg-gray-50 p-4 rounded-xl shadow-sm border border-gray-500 flex flex-col gap-2">
                {columns.map((col, j) => (
                  <div key={j} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-0">
                    <span className="font-semibold text-gray-500 text-sm">{col.header}:</span>
                    <span>{col.accessor(item, i)}</span>
                  </div>
                ))}
              </div>
            )
          ))}
        </div>
    </div>
  </div>
  );
}
