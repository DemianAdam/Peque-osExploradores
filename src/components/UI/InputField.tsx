
interface InputFieldProps {
  label: string;
  id: string;
  type: 'text' | 'password' | 'email';
  placeholder?: string;
}

export default function InputField({ label, id, type, placeholder }: InputFieldProps) {
  return ( 
    <div className="flex flex-col mb-4">
      <label className="text-xl font-bold text-gray-800 mb-2 ml-2" htmlFor={id}>
        {label}
      </label>
      <input className="w-full px-5 py-3 rounded-full bg-[#F9A8D4] text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all shadow-inner"
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
      />
    </div>
  );
}