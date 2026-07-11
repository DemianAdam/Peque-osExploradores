import { FullGroup } from "../../../convex/groups/types";
import { Modal } from "../UI/Modal";

interface GroupDetailModalProps {
  group: FullGroup;
  onClose: () => void;
}

export function GroupDetailModal({ group, onClose }: GroupDetailModalProps) {
  return (
    <Modal title={`Detalle del grupo: ${group.name}`} isOpen={!!group} onClose={onClose}>
      <div className="flex flex-col gap-6">

        {/* NIÑOS */}
        <div className="bg-gray-50 border rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Chicos ({group.children.length})</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            {group.children.map(c => <li key={c._id}>{c.name}</li>)}
          </ul>
        </div>

        {/* SEÑOS */}
        <div className="bg-gray-50 border rounded-xl p-4">
          <h3 className="font-semibold text-gray-700 mb-2">Seños ({group.teachers.length})</h3>
          <ul className="text-sm text-gray-600 list-disc pl-5">
            {group.teachers.map((t) => (
              <li key={t._id}>
                {t.name}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </Modal>
  );
}