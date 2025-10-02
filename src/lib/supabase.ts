import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos de dados para o dashboard
export type Lead = {
  id: string;
  created_at: string;
  status: string;
  engagement_rate?: number;
  conversion_rate?: number;
  response_time?: number;
  followup_effectiveness?: number;
  post_exposure_qualification?: number;
  converted_value?: number;
};

// Funções para buscar dados do Supabase
export async function getLeads(period: string = 'todos') {
  let query = supabase.from('leads').select('*');
  
  // Filtrar por período
  if (period !== 'todos') {
    const now = new Date();
    let startDate = new Date();
    
    if (period === 'hoje') {
      startDate.setHours(0, 0, 0, 0);
    } else if (period === 'ultima_semana') {
      startDate.setDate(now.getDate() - 7);
    } else if (period === 'ultimo_mes') {
      startDate.setMonth(now.getMonth() - 1);
    }
    
    query = query.gte('created_at', startDate.toISOString());
  }
  
  const { data, error } = await query;
  
  if (error) {
    console.error('Erro ao buscar leads:', error);
    return [];
  }
  
  return data || [];
}

export async function getDashboardMetrics(period: string = 'todos') {
  const leads = await getLeads(period);
  
  // Calcular métricas
  const totalLeads = leads.length;
  const engagementRate = leads.reduce((sum, lead) => sum + (lead.engagement_rate || 0), 0) / (totalLeads || 1);
  const conversionRate = leads.reduce((sum, lead) => sum + (lead.conversion_rate || 0), 0) / (totalLeads || 1);
  const avgResponseTime = leads.reduce((sum, lead) => sum + (lead.response_time || 0), 0) / (totalLeads || 1);
  const followupEffectiveness = leads.reduce((sum, lead) => sum + (lead.followup_effectiveness || 0), 0) / (totalLeads || 1);
  const postExposureQualification = leads.reduce((sum, lead) => sum + (lead.post_exposure_qualification || 0), 0) / (totalLeads || 1);
  const convertedValue = leads.reduce((sum, lead) => sum + (lead.converted_value || 0), 0);
  
  return {
    totalLeads,
    engagementRate,
    conversionRate,
    avgResponseTime,
    followupEffectiveness,
    postExposureQualification,
    convertedValue
  };
}

export async function getMetricsHistory(period: string = 'ultimo_mes') {
  // Esta função simularia buscar dados históricos para os gráficos
  const { data, error } = await supabase
    .from('metrics_history')
    .select('*')
    .order('date', { ascending: true });
  
  if (error) {
    console.error('Erro ao buscar histórico de métricas:', error);
    return [];
  }
  
  return data || [];
}

export async function getAdvancedTracking() {
  const { data, error } = await supabase
    .from('advanced_tracking')
    .select('*');
  
  if (error) {
    console.error('Erro ao buscar rastreamento avançado:', error);
    return [];
  }
  
  return data || [];
}