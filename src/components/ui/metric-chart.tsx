import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface MetricChartProps {
  title: string;
  data: any[];
  dataKey: string;
  color?: string;
  unit?: string;
}

export function MetricChart({ 
  title, 
  data, 
  dataKey, 
  color = "#ff0000", 
  unit = "" 
}: MetricChartProps) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 mb-4">
      <h3 className="text-white text-center mb-4 uppercase text-sm">{title}</h3>
      <div className="h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#6b7280', fontSize: 10 }} 
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
            />
            <YAxis 
              tick={{ fill: '#6b7280', fontSize: 10 }} 
              tickLine={{ stroke: '#374151' }}
              axisLine={{ stroke: '#374151' }}
              unit={unit}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                borderColor: '#374151',
                color: '#f3f4f6'
              }}
              labelStyle={{ color: '#f3f4f6' }}
              formatter={(value: any) => [`${value}${unit}`, '']}
            />
            <Line 
              type="monotone" 
              dataKey={dataKey} 
              stroke={color} 
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}