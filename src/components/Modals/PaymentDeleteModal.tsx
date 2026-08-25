import { Modal } from "../UI/Modal";

interface PaymentDeleteModalProps {
    isOpen: boolean; 
    onClose: () => void; 
    onConfirm: () => void;
    label: string;
}

export function PaymentDeleteModal({ isOpen, onClose, onConfirm, label }: PaymentDeleteModalProps) {
    return (
        <Modal 
            title="Eliminar Pago" 
            isOpen={isOpen} 
            onClose={onClose}
        >
            <div className="space-y-4">
                <p className="text-slate-700">
                    ¿Está seguro que quiere eliminar el pago <strong className="text-slate-900">{label}</strong>?
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