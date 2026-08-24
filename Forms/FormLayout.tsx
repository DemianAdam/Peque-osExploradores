// components/UI/Form/FormLayout.tsx
export function FormLayout({ children, onSubmit }: { children: React.ReactNode, onSubmit: () => void}) {
  return (
    <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 w-full max-w-lg mx-auto">
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="flex flex-col gap-5">
        {children}
        <button 
            type="submit" 
            className="bg-orange-500 text-white font-bold py-3 rounded-full hover:bg-orange-600 transition shadow-lg mt-4"
        >
            Guardar
        </button>
      </form>
    </div>
  );
}