import { X } from "lucide-react";


// components/UI/Modal.tsx
interface ModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  
}

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      {/* Añadimos 'relative' para que la cruz se posicione respecto a esta caja */}
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl relative">
        
        {/* Botón de la cruz en la esquina superior derecha */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition p-1 rounded-full hover:bg-slate-100"
          type="button"
        >
          <X size={20} />
        </button>

        {/* Añadimos pr-8 para que el título no se chavene con la cruz */}
        <h2 className="text-2xl font-bold mb-4 text-pink-600 pr-8">{title}</h2>
        
        <div className="space-y-4">
            {children}
        </div>
        
      </div>
    </div>
  );
}