import React from 'react';

interface TrackingItemProps {
  id: number;
  title: string;
  engagementRate: number;
  conversionRate: number;
  priority?: 'high' | 'medium' | 'low';
}

export function TrackingItem({ id, title, engagementRate, conversionRate, priority = 'medium' }: TrackingItemProps) {
  const priorityIcon = {
    high: '🔴',
    medium: '🟠',
    low: '🟡',
  };

  return (
    <div className="bg-slate-700 rounded-lg p-4 mb-4 border border-slate-600">
      <div className="flex items-center mb-2">
        <span className="mr-2">{priorityIcon[priority]}</span>
        <span className="bg-slate-800 text-gray-400 rounded-full w-6 h-6 flex items-center justify-center mr-2">
          {id}
        </span>
        <h3 className="text-white text-sm flex-1">{title}</h3>
        <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs">
          Acessar
        </button>
      </div>
      
      <div className="flex mt-4 space-x-4">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Taxa de Engajamento</span>
            <span className="text-xs font-bold text-green-400">{engagementRate}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${engagementRate}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400">Conversão</span>
            <span className="text-xs font-bold text-amber-400">{conversionRate}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-amber-500 h-2 rounded-full" 
              style={{ width: `${conversionRate}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}