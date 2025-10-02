import React from 'react';

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  value: string | number;
  color?: string;
}

export function Card({ icon, title, subtitle, value, color = 'text-white' }: CardProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 h-full">
      <div className="flex items-center mb-2">
        {icon && <div className="mr-2">{icon}</div>}
        <h3 className="text-sm text-gray-400 uppercase">{title}</h3>
      </div>
      {subtitle && <p className="text-xs text-gray-500 mb-2">{subtitle}</p>}
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}