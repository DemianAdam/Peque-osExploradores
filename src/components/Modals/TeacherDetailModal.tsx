import { Modal } from "../UI/Modal";
import { useNavigate } from "react-router";

interface TeacherDetailModalProps {
  teacher: any; // O tu tipo FullTeacher
  isOpen: boolean;
  onClose: () => void;
}

export function TeacherDetailModal({ teacher, isOpen, onClose }: TeacherDetailModalProps) {
  const navigate = useNavigate();

  return (
    <Modal 
      title={`Grupos de ${teacher?.name}`} 
      isOpen={isOpen} 
      onClose={onClose}
    >
      <div className="flex flex-col gap-3">
        <p className="text-gray-600">Grupos asignados:</p>
        
        <div className="flex flex-wrap gap-2">
          {teacher?.groups?.map((grupo: any) => (
            <button
              key={grupo._id}
              onClick={() => navigate(`/grupos/${grupo._id}`)}
              className="bg-sky-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-sky-600 transition"
            >
              {grupo.name} 
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}