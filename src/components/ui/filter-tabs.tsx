import React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

interface FilterTabsProps {
  currentFilter: string;
  onFilterChange: (value: string) => void;
}

export function FilterTabs({ currentFilter, onFilterChange }: FilterTabsProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <div className="flex items-center mb-4">
        <span className="text-amber-500 mr-2">📅</span>
        <h3 className="text-white uppercase text-sm">Filtrar por período</h3>
      </div>
      
      <ToggleGroup.Root
        type="single"
        value={currentFilter}
        onValueChange={(value) => {
          if (value) onFilterChange(value);
        }}
        className="flex space-x-2"
      >
        <ToggleGroup.Item
          value="todos"
          className={`px-4 py-2 rounded-md ${
            currentFilter === 'todos' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          TODOS
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="hoje"
          className={`px-4 py-2 rounded-md ${
            currentFilter === 'hoje' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          HOJE
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="ultima_semana"
          className={`px-4 py-2 rounded-md ${
            currentFilter === 'ultima_semana' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          ÚLTIMA SEMANA
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="ultimo_mes"
          className={`px-4 py-2 rounded-md ${
            currentFilter === 'ultimo_mes' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          ÚLTIMO MÊS
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value="personalizado"
          className={`px-4 py-2 rounded-md ${
            currentFilter === 'personalizado' 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
          }`}
        >
          PERSONALIZADO
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      
      <div className="mt-4 flex items-center">
        <input 
          type="checkbox" 
          id="compare" 
          className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600"
        />
        <label htmlFor="compare" className="text-sm text-gray-300">
          Comparar com período anterior
        </label>
      </div>
    </div>
  );
}