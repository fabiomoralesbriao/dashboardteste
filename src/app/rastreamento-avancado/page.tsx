'use client';

import { useState, useEffect } from 'react';
import { FilterTabs } from '@/components/ui/filter-tabs';
import { TrackingItem } from '@/components/ui/tracking-item';
import { getAdvancedTracking } from '@/lib/supabase';
import Link from 'next/link';

export default function RastreamentoAvancado() {
  const [currentFilter, setCurrentFilter] = useState('todos');
  const [trackingItems, setTrackingItems] = useState([
    {
      id: 1,
      title: 'PINZ Container - OS 63417-2022 Avaliação',
      engagementRate: 94.7,
      conversionRate: 67,
      priority: 'high'
    },
    {
      id: 2,
      title: 'OS Multibox Container + Banheiro + ...',
      engagementRate: 78.6,
      conversionRate: 45,
      priority: 'medium'
    },
    {
      id: 3,
      title: 'Seu projeto precisa de agilidade e conforto...',
      engagementRate: 76.8,
      conversionRate: 57,
      priority: 'medium'
    },
    {
      id: 4,
      title: 'OS Multibox Container + Banheiro + ...',
      engagementRate: 80.0,
      conversionRate: 61,
      priority: 'medium'
    },
    {
      id: 5,
      title: 'Um valor mais a conta do que você precisa...',
      engagementRate: 44.4,
      conversionRate: 32,
      priority: 'low'
    },
    {
      id: 6,
      title: 'Um valor mais a conta do que você precisa...',
      engagementRate: 50.0,
      conversionRate: 28,
      priority: 'low'
    },
    {
      id: 7,
      title: 'OS Multibox Container + Banheiro + ...',
      engagementRate: 82.7,
      conversionRate: 55,
      priority: 'medium'
    },
    {
      id: 8,
      title: 'Um valor mais a conta do que você precisa...',
      engagementRate: 55.0,
      conversionRate: 30,
      priority: 'low'
    }
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // Buscar dados do Supabase
        const data = await getAdvancedTracking();
        if (data && data.length > 0) {
          // Mapear os dados do Supabase para o formato esperado pelo componente
          const formattedData = data.map((item: any) => ({
            id: item.id,
            title: item.campanha,
            engagementRate: item.ctr * 10, // Convertendo CTR para taxa de engajamento
            conversionRate: (item.conversoes / item.cliques) * 100 || 0,
            priority: item.roi > 5 ? 'high' : item.roi > 3 ? 'medium' : 'low'
          }));
          setTrackingItems(formattedData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados de rastreamento:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [currentFilter]);

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 p-4 rounded-lg m-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-red-600 rounded-full p-2 mr-3">
            <span className="text-xl">🔍</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">RASTREAMENTO AVANÇADO</h1>
            <p className="text-sm text-gray-400">PINZ Container</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href="/" className="bg-slate-700 text-white px-4 py-2 rounded-md text-sm">
            DASHBOARD PRINCIPAL
          </Link>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
            EXPORTAR
          </button>
        </div>
      </header>

      {/* Filter Section */}
      <section className="m-4">
        <FilterTabs currentFilter={currentFilter} onFilterChange={handleFilterChange} />
      </section>

      {/* Tracking Analysis */}
      <section className="m-4">
        <div className="bg-slate-800 p-4 rounded-lg mb-4">
          <div className="flex items-center mb-4">
            <span className="bg-indigo-600 text-white p-1 rounded-md mr-2">📊</span>
            <h2 className="text-white text-sm">Análise de Anúncios</h2>
          </div>
          
          <div className="flex space-x-2 mb-4">
            <button className="bg-indigo-600 text-white px-3 py-1 rounded-md text-xs">
              Tipo Leads
            </button>
            <button className="bg-green-600 text-white px-3 py-1 rounded-md text-xs">
              Por Qualificação
            </button>
            <button className="bg-amber-600 text-white px-3 py-1 rounded-md text-xs">
              Por Conversão
            </button>
          </div>
          
          {trackingItems.map((item) => (
            <TrackingItem 
              key={item.id}
              id={item.id}
              title={item.title}
              engagementRate={item.engagementRate}
              conversionRate={item.conversionRate}
              priority={item.priority as 'high' | 'medium' | 'low'}
            />
          ))}
        </div>
      </section>
    </div>
  );
}