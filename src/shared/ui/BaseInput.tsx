// src/shared/ui/BaseInput.tsx
import React from 'react';

interface BaseInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function BaseInput({ label, error,className, type, ...props }: BaseInputProps) {
  const isNumber = type === 'number';

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className="text-sm font-bold text-gray-600 ml-2">{label}</label>}
      <input
        type={type}
        {...props}
        
        className={`w-full bg-gray-50 border border-gray-100 rounded-2xl px-5 py-3 outline-none focus:border-orange-300 transition-all shadow-sm placeholder:text-gray-400 
          /* 🚀 Solución global: si es number, le borramos las flechitas automáticamente */
          ${isNumber ? '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield]' : ''}
          ${className || ""}`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}