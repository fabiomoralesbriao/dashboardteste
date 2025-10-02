'use client';

import { useState, useEffect } from 'react';
import { Users, BarChart3, LineChart, Clock, Target, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FilterTabs } from '@/components/ui/filter-tabs';
import { MetricChart } from '@/components/ui/metric-chart';
import { getDashboardMetrics, getMetricsHistory } from '@/lib/supabase';
import { exportToCSV, exportToPDF, exportChartAsImage } from '@/lib/export';
import Link from 'next/link';

export default function Dashboard() {
  const [currentFilter, setCurrentFilter] = useState('todos');
  const [metrics, setMetrics] = useState({
    totalLeads: 2042,
    engagementRate: 74.0,
    conversionRate: 86.3,
    avgResponseTime: 43.7,
    followupEffectiveness: 33.2,
    postExposureQualification: 3.6,
    convertedValue: 92500
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // Buscar dados reais do Supabase
        const metricsData = await getDashboardMetrics(currentFilter);
        setMetrics(metricsData);
        
        // Buscar dados históricos para os gráficos
        const historyData = await getMetricsHistory(currentFilter);
        if (historyData && historyData.length > 0) {
          // Formatar dados para os gráficos
          const formattedData = historyData.map(item => ({
            date: item.periodo,
            leads: item.total_leads,
            engagement: item.taxa_crescimento * 10,
            conversion: item.taxa_conversao,
            responseTime: Math.round(Math.random() * 60 + 20), // Simulado
            followup: Math.round(item.taxa_conversao * 0.8),
            qualification: Math.round(item.taxa_conversao * 0.4),
            value: item.receita_total
          }));
          setChartData(formattedData);
        } else {
          // Fallback para dados simulados
          const dummyData = generateDummyChartData();
          setChartData(dummyData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Fallback para dados simulados em caso de erro
        const dummyData = generateDummyChartData();
        setChartData(dummyData);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [currentFilter]);

  // Função para gerar dados simulados para os gráficos
  function generateDummyChartData() {
    const data = [];
    const now = new Date();
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      data.push({
        date: `${date.getDate()}/${date.getMonth() + 1}`,
        leads: Math.floor(Math.random() * 100) + 50,
        engagement: Math.floor(Math.random() * 30) + 60,
        conversion: Math.floor(Math.random() * 20) + 70,
        responseTime: Math.floor(Math.random() * 20) + 30,
        followup: Math.floor(Math.random() * 40) + 10,
        qualification: Math.floor(Math.random() * 10) + 1,
        value: Math.random() < 0.1 ? Math.floor(Math.random() * 50000) + 30000 : Math.floor(Math.random() * 5000) + 1000
      });
    }
    
    return data;
  }

  const handleFilterChange = (filter: string) => {
    setCurrentFilter(filter);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="bg-slate-800 p-4 rounded-lg m-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-red-600 rounded-full p-2 mr-3">
            <span className="text-xl">🏢</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">DASHBOARD PRÉ-VENDAS</h1>
            <p className="text-sm text-gray-400">PINZ Container</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href="/rastreamento-avancado" className="bg-cyan-500 text-white px-4 py-2 rounded-md text-sm">
            RASTREAMENTO AVANÇADO
          </Link>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            onClick={() => exportToCSV(chartData, 'dashboard-pre-vendas')}
          >
            EXPORTAR
          </button>
        </div>
      </header>

      {/* Filter Section */}
      <section className="m-4">
        <FilterTabs currentFilter={currentFilter} onFilterChange={handleFilterChange} />
      </section>

      {/* Metrics Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
        <Card 
          icon={<Users size={20} className="text-blue-400" />}
          title="TOTAL DE LEADS" 
          subtitle="Leads gerados no período"
          value={metrics.totalLeads.toLocaleString()}
        />
        
        <Card 
          icon={<BarChart3 size={20} className="text-blue-400" />}
          title="TAXA DE ENGAJAMENTO" 
          subtitle="Percentual de leads engajados"
          value={`${metrics.engagementRate.toFixed(1)}%`}
        />
        
        <Card 
          icon={<LineChart size={20} className="text-blue-400" />}
          title="CONVERSÃO" 
          subtitle="Taxa de conversão de leads"
          value={`${metrics.conversionRate.toFixed(1)}%`}
          color="text-green-400"
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 m-4">
        <Card 
          icon={<Clock size={20} className="text-blue-400" />}
          title="TEMPO MÉDIO IA" 
          subtitle="Tempo médio de resposta"
          value={`${metrics.avgResponseTime.toFixed(1)} seg`}
        />
        
        <Card 
          icon={<Target size={20} className="text-blue-400" />}
          title="EFETIVIDADE FOLLOWUP" 
          subtitle="Taxa de sucesso em followups"
          value={`${metrics.followupEffectiveness.toFixed(1)}%`}
        />
        
        <Card 
          icon={<Target size={20} className="text-blue-400" />}
          title="QUALIFICAÇÃO PÓS EXPOSIÇÃO" 
          subtitle="Índice de qualificação pós comercial"
          value={`${metrics.postExposureQualification.toFixed(1)}%`}
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <Card 
          icon={<DollarSign size={20} className="text-blue-400" />}
          title="VALOR CONVERTIDO IA" 
          subtitle="Valor total convertido"
          value={`R$ ${metrics.convertedValue.toLocaleString()}`}
          color="text-green-400"
        />
        
        <div className="bg-amber-500 rounded-lg p-4 flex items-center justify-between">
          <div>
            <h3 className="text-white uppercase text-sm">CALCULADORA ROI</h3>
            <p className="text-xs text-amber-200">Retorno sobre investimento em IA</p>
          </div>
          <button className="bg-amber-600 text-white px-3 py-1 rounded-md text-xs">
            CALCULAR ROI
          </button>
        </div>
      </section>

      {/* Charts Section */}
      <section className="m-4">
        <div className="bg-slate-800 p-4 rounded-lg mb-4 flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2">📊</span>
            <h2 className="text-white uppercase text-sm">EVOLUÇÃO DAS MÉTRICAS</h2>
          </div>
          <div className="flex space-x-2">
            <button className="bg-slate-700 text-white px-3 py-1 rounded-md text-xs flex items-center">
              <span className="mr-1">📥</span> IMPRIMIR
            </button>
            <button className="bg-slate-700 text-white px-3 py-1 rounded-md text-xs flex items-center">
              <span className="mr-1">📤</span> EXPORTAR
            </button>
            <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs">
              OCULTAR GRÁFICOS
            </button>
          </div>
        </div>

        <MetricChart 
          title="TOTAL DE LEADS" 
          data={chartData} 
          dataKey="leads" 
          color="#ff4560"
        />
        
        <MetricChart 
          title="TAXA DE ENGAJAMENTO (%)" 
          data={chartData} 
          dataKey="engagement" 
          color="#ff4560"
          unit="%"
        />
        
        <MetricChart 
          title="TAXA DE CONVERSÃO (%)" 
          data={chartData} 
          dataKey="conversion" 
          color="#ff4560"
          unit="%"
        />
        
        <MetricChart 
          title="TEMPO MÉDIO DE RESPOSTA (SEG)" 
          data={chartData} 
          dataKey="responseTime" 
          color="#ff4560"
          unit=" seg"
        />
        
        <MetricChart 
          title="EFETIVIDADE FOLLOWUP (%)" 
          data={chartData} 
          dataKey="followup" 
          color="#ff4560"
          unit="%"
        />
        
        <MetricChart 
          title="QUALIFICAÇÃO PÓS EXPOSIÇÃO (%)" 
          data={chartData} 
          dataKey="qualification" 
          color="#8884d8"
          unit="%"
        />
        
        <MetricChart 
          title="VALOR CONVERTIDO COM ATENDIMENTO IA (R$)" 
          data={chartData} 
          dataKey="value" 
          color="#00e396"
          unit=""
        />
      </section>

      {/* Period Selector */}
      <section className="m-4 bg-slate-800 p-4 rounded-lg flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2">PERÍODO DO GRÁFICO:</span>
          <select className="bg-slate-700 text-white p-2 rounded-md">
            <option>Últimos 30 dias</option>
            <option>Últimos 60 dias</option>
            <option>Últimos 90 dias</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
          ATUALIZAR DASHBOARD
        </button>
      </section>
    </div>
  );
}