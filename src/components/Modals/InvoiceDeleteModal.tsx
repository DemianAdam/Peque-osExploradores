import { Modal } from "../UI/Modal";

interface InvoiceDeleteModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    onConfirm: () => void;
    description: string; // <--- Sincronizado correctamente
}

export function InvoiceDeleteModal({ isOpen, onClose, onConfirm, description }: InvoiceDeleteModalProps) {
    return (
        <Modal 
            title="Eliminar Gasto" 
            isOpen={isOpen} 
            onClose={onClose}
        >
            <div className="space-y-4">
                <p className="text-slate-700">
                    ¿Está seguro que quiere eliminar el gasto <strong className="text-slate-900">{description}</strong>?
                </p>

                {/* Botones de acción personalizados dentro del modal */}
                <div className="flex gap-3 pt-4">
                    <button
                        onClick={onClose}
                        className="w-1/2 bg-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-300 font-medium transition"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className="w-1/2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 font-medium transition"
                    >
                        Sí, eliminar
                    </button>
                </div>
            </div>
        </Modal>
    );
}