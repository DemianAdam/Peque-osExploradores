import { Modal } from "../UI/Modal";


export function GroupDeleteModal({ isOpen, onClose, onConfirm, groupName }: { 
    isOpen: boolean; 
    onClose: () => void; 
    onConfirm: () => void;
    groupName: string;
}) {
    
    return (
        <Modal 
            title="Eliminar Grupo" 
            isOpen={isOpen} 
            onClose={onClose}
        >
            <div className="space-y-4">
                <p className="text-slate-700">
                    ¿Está seguro que quiere eliminar el grupo <strong className="text-slate-900">{groupName}</strong>?
                </p>
                <p className="text-sm text-pink-600 font-medium bg-pink-50 p-3 rounded-md border border-pink-100">
                    ⚠️ Advertencia: El grupo no debe tener ningún chico asignado para poder ser eliminado.
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