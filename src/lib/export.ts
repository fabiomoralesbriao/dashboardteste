// Função para exportar dados para CSV
export function exportToCSV(data: any[], filename: string) {
  if (!data || !data.length) {
    console.error('Nenhum dado para exportar');
    return;
  }

  // Extrair cabeçalhos das colunas
  const headers = Object.keys(data[0]);
  
  // Criar linhas de dados
  const csvRows = [];
  
  // Adicionar cabeçalhos
  csvRows.push(headers.join(','));
  
  // Adicionar dados
  for (const row of data) {
    const values = headers.map(header => {
      const value = row[header];
      // Escapar aspas e adicionar aspas em strings com vírgulas
      return `"${String(value).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }
  
  // Combinar em uma string CSV
  const csvString = csvRows.join('\n');
  
  // Criar blob e link para download
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  // Criar URL para o blob
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  // Adicionar ao DOM, clicar e remover
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Função para exportar dados para PDF (simulada)
export function exportToPDF(elementId: string, filename: string) {
  console.log(`Exportando elemento ${elementId} para PDF como ${filename}.pdf`);
  alert('Exportação para PDF simulada. Em um ambiente real, usaríamos uma biblioteca como jsPDF ou html2pdf.');
}

// Função para exportar gráficos como imagens
export function exportChartAsImage(chartId: string, filename: string) {
  const chartElement = document.getElementById(chartId);
  if (!chartElement) {
    console.error(`Elemento com ID ${chartId} não encontrado`);
    return;
  }
  
  // Em um ambiente real, usaríamos html2canvas ou uma biblioteca similar
  console.log(`Exportando gráfico ${chartId} como imagem ${filename}.png`);
  alert('Exportação de gráfico simulada. Em um ambiente real, usaríamos html2canvas ou uma API específica da biblioteca de gráficos.');
}