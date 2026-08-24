import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  children?: ReactNode;
  onClick?: () => void;
}

export function DashboardCard({ title, children, onClick }: DashboardCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between border border-gray-100"
    >
      <h3 className="text-lg font-bold text-[#1E293B] mb-4">{title}</h3>
      <div className="text-gray-600">
        {children || <p className="text-sm italic text-gray-400">Sin datos recientes</p>}
      </div>
    </div>
  );
}