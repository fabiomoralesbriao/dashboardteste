-- Tabela de leads
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    email TEXT,
    telefone TEXT,
    origem TEXT,
    status TEXT DEFAULT 'novo',
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ultima_atualizacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    produto_interesse TEXT,
    valor_potencial DECIMAL(10,2),
    notas TEXT
);

-- Tabela de histórico de métricas
CREATE TABLE IF NOT EXISTS metrics_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    data_registro TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    total_leads INTEGER,
    taxa_conversao DECIMAL(5,2),
    ticket_medio DECIMAL(10,2),
    receita_total DECIMAL(10,2),
    taxa_crescimento DECIMAL(5,2),
    taxa_rejeicao DECIMAL(5,2),
    periodo TEXT
);

-- Tabela de rastreamento avançado
CREATE TABLE IF NOT EXISTS advanced_tracking (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campanha TEXT,
    fonte TEXT,
    data_inicio TIMESTAMP WITH TIME ZONE,
    data_fim TIMESTAMP WITH TIME ZONE,
    orcamento DECIMAL(10,2),
    gasto DECIMAL(10,2),
    impressoes INTEGER,
    cliques INTEGER,
    conversoes INTEGER,
    ctr DECIMAL(5,2),
    cpc DECIMAL(5,2),
    cpa DECIMAL(5,2),
    roi DECIMAL(5,2),
    status TEXT
);

-- Inserir dados de exemplo para leads
INSERT INTO leads (nome, email, telefone, origem, status, produto_interesse, valor_potencial, notas)
VALUES
    ('João Silva', 'joao.silva@email.com', '(11) 98765-4321', 'Facebook', 'qualificado', 'Plano Premium', 1500.00, 'Interessado em fechar ainda este mês'),
    ('Maria Oliveira', 'maria.oliveira@email.com', '(21) 99876-5432', 'Google', 'novo', 'Plano Básico', 500.00, 'Solicitou demonstração'),
    ('Carlos Santos', 'carlos.santos@email.com', '(31) 97654-3210', 'Instagram', 'negociação', 'Plano Enterprise', 5000.00, 'Negociando desconto'),
    ('Ana Pereira', 'ana.pereira@email.com', '(41) 96543-2109', 'LinkedIn', 'fechado', 'Plano Premium', 1500.00, 'Contrato assinado'),
    ('Paulo Costa', 'paulo.costa@email.com', '(51) 95432-1098', 'Indicação', 'perdido', 'Plano Enterprise', 5000.00, 'Fechou com concorrente'),
    ('Fernanda Lima', 'fernanda.lima@email.com', '(61) 94321-0987', 'Facebook', 'qualificado', 'Plano Básico', 500.00, 'Aguardando aprovação interna'),
    ('Roberto Alves', 'roberto.alves@email.com', '(71) 93210-9876', 'Google', 'novo', 'Plano Premium', 1500.00, 'Primeiro contato realizado'),
    ('Juliana Martins', 'juliana.martins@email.com', '(81) 92109-8765', 'Instagram', 'negociação', 'Plano Enterprise', 5000.00, 'Enviada proposta comercial');

-- Inserir dados de exemplo para métricas
INSERT INTO metrics_history (data_registro, total_leads, taxa_conversao, ticket_medio, receita_total, taxa_crescimento, taxa_rejeicao, periodo)
VALUES
    (NOW() - INTERVAL '30 days', 150, 12.5, 1200.00, 22500.00, 5.2, 32.1, 'Abril 2023'),
    (NOW() - INTERVAL '60 days', 142, 11.8, 1150.00, 20470.00, 4.8, 33.5, 'Março 2023'),
    (NOW() - INTERVAL '90 days', 135, 10.5, 1100.00, 18700.00, 3.9, 35.2, 'Fevereiro 2023'),
    (NOW() - INTERVAL '120 days', 130, 9.8, 1050.00, 17160.00, 3.5, 36.8, 'Janeiro 2023'),
    (NOW() - INTERVAL '150 days', 125, 9.2, 1000.00, 15000.00, 3.0, 38.5, 'Dezembro 2022'),
    (NOW() - INTERVAL '180 days', 120, 8.5, 950.00, 13680.00, 2.5, 40.2, 'Novembro 2022'),
    (NOW() - INTERVAL '210 days', 115, 8.0, 900.00, 12420.00, 2.0, 42.0, 'Outubro 2022'),
    (NOW() - INTERVAL '240 days', 110, 7.5, 850.00, 11220.00, 1.5, 43.5, 'Setembro 2022'),
    (NOW() - INTERVAL '270 days', 105, 7.0, 800.00, 10080.00, 1.0, 45.0, 'Agosto 2022'),
    (NOW() - INTERVAL '300 days', 100, 6.5, 750.00, 9000.00, 0.5, 46.5, 'Julho 2022'),
    (NOW() - INTERVAL '15 days', 155, 13.0, 1250.00, 24375.00, 5.5, 31.5, 'Maio 2023'),
    (NOW() - INTERVAL '1 days', 160, 13.5, 1300.00, 26520.00, 5.8, 30.8, 'Junho 2023');

-- Inserir dados de exemplo para rastreamento avançado
INSERT INTO advanced_tracking (campanha, fonte, data_inicio, data_fim, orcamento, gasto, impressoes, cliques, conversoes, ctr, cpc, cpa, roi, status)
VALUES
    ('Black Friday', 'Facebook', NOW() - INTERVAL '60 days', NOW() - INTERVAL '30 days', 5000.00, 4800.00, 150000, 7500, 300, 5.0, 0.64, 16.00, 3.12, 'Concluída'),
    ('Lançamento Produto', 'Google Ads', NOW() - INTERVAL '45 days', NOW() - INTERVAL '15 days', 8000.00, 7500.00, 200000, 10000, 450, 5.0, 0.75, 16.67, 3.00, 'Concluída'),
    ('Remarketing', 'Instagram', NOW() - INTERVAL '30 days', NOW() + INTERVAL '30 days', 3000.00, 1500.00, 80000, 4000, 180, 5.0, 0.38, 8.33, 6.00, 'Em andamento'),
    ('Webinar Gratuito', 'LinkedIn', NOW() - INTERVAL '15 days', NOW() + INTERVAL '15 days', 2000.00, 1000.00, 50000, 2500, 120, 5.0, 0.40, 8.33, 6.00, 'Em andamento'),
    ('Desconto Especial', 'Email', NOW(), NOW() + INTERVAL '30 days', 1000.00, 200.00, 25000, 1250, 60, 5.0, 0.16, 3.33, 15.00, 'Em andamento'),
    ('Parceria Estratégica', 'Afiliados', NOW() + INTERVAL '15 days', NOW() + INTERVAL '45 days', 4000.00, 0.00, 0, 0, 0, 0.0, 0.00, 0.00, 0.00, 'Agendada'),
    ('Campanha Sazonal', 'Facebook', NOW() + INTERVAL '30 days', NOW() + INTERVAL '60 days', 6000.00, 0.00, 0, 0, 0, 0.0, 0.00, 0.00, 0.00, 'Agendada'),
    ('Promoção Relâmpago', 'Google Ads', NOW() + INTERVAL '45 days', NOW() + INTERVAL '50 days', 1500.00, 0.00, 0, 0, 0, 0.0, 0.00, 0.00, 0.00, 'Agendada');