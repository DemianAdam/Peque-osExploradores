// src/components/UI/Form/BaseSelect.tsx
interface SelectOption<T extends string = string> {
  label: string;
  value: T;
}

interface BaseSelectProps<T extends string = string> {
  label: string;
  value: T | "";
  options: SelectOption<T>[];
  onChange: (value: T) => void;
  error?: string;
}

export function BaseSelect<T extends string = string>({ label, value, options, onChange, error }: BaseSelectProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
        className="p-3 border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
      >
        <option value="" disabled>Seleccione una opción</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}
