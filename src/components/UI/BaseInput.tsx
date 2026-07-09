// components/UI/Form/BaseInput.tsx
import React from 'react';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function BaseInput({ label, ...props }: BaseInputProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-bold text-gray-600 ml-2">{label}</label>}
      <input
        {...props}
        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-orange-300 transition-all shadow-sm placeholder:text-gray-400"
      />
    </div>
  );
}