// src/components/UI/Form/BaseSwitch.tsx
interface BaseSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function BaseSwitch({ label, checked, onChange }: BaseSwitchProps) {
  return (
    <div className="flex items-center justify-between p-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          checked ? "bg-orange-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}