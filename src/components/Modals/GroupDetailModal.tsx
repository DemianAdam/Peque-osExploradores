import { Modal } from "../UI/Modal";

interface GroupDetailModalProps {
  group: any;
  onClose: () => void;
  allChildren: any[];
  allGroupTeachers: any[];
  allTeachers: any[];
}

export function GroupDetailModal({ group, onClose, allChildren, allGroupTeachers, allTeachers }: GroupDetailModalProps) {
  // Aquí ocurre toda la magia del filtrado, fuera del principal
  const childrenInGroup = allChildren?.filter(c => c.groupId === group._id) || [];
  const teachersInGroup = allGroupTeachers?.filter(gt => gt.groupId === group._id) || [];
  const getTeacherName = (teacherId: string) => {
      const teacher = allTeachers?.find((t: any) => t._id === teacherId);
      return teacher ? teacher.name : "Docente no encontrado";
    };
  return (
    <Modal title={`Detalle del grupo: ${group.name}`} isOpen={!!group} onClose={onClose}>
      <div className="flex flex-col gap-6">
        
        {/* NIÑOS */}
        <div className="bg-gray-50 border rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Chicos ({childrenInGroup.length})</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            {childrenInGroup.map(c => <li key={c._id}>{c.name}</li>)}
          </ul>
        </div>

        {/* SEÑOS */}
        <div className="bg-gray-50 border rounded-xl p-4">
        <h3 className="font-semibold text-gray-700 mb-2">Seños ({teachersInGroup.length})</h3>
        <ul className="text-sm text-gray-600 list-disc pl-5">
          {teachersInGroup.map((gt: any) => (
            <li key={gt._id}>
              {getTeacherName(gt.teacherId)}
            </li>
          ))}
        </ul>
      </div>
        
      </div>
    </Modal>
  );
}