// components/UI/Modal.tsx
interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // Esto permite meter cualquier cosa dentro
}

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-pink-600">{title}</h2>
        
        <div className="space-y-4">
            {children}
        </div>
        
        <button 
          onClick={onClose} 
          className="mt-6 w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}