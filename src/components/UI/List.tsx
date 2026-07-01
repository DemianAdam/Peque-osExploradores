interface Column<T> {
  header: string;
  accessor: (item: T) => React.ReactNode;
}

interface ListProps<T> {
  title: string;
  data: T[] | undefined;
  columns: Column<T>[];
  onSearch: (term: string) => void;
}

export function List<T>({ title, data, columns, onSearch }: ListProps<T>) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      
      {/* Search Input */}
      <input 
        type="text" 
        placeholder="Buscar..." 
        className="w-full p-2 border rounded mb-4"
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Table */}
      <table className="w-full text-left">
        <thead>
          <tr>
            {columns.map((col, i) => <th key={i} className="p-2 border-b">{col.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, i) => (
            <tr key={i} className="border-b">
              {columns.map((col, j) => <td key={j} className="p-2">{col.accessor(item)}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}