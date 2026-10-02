db = db.getSiblingDB('universidade');

// Projetos de pesquisa
db.projetos.insertMany([
  {
    titulo: "Aplicação de IA em Diagnósticos Médicos",
    orientador: "Dr. Carlos Mendes",
    alunos: ["João Pedro Souza", "Maria Clara Ferreira"],
    departamento: "Computação",
    status: "Em andamento",
    inicio: "2024-03-01",
    previsao_termino: "2025-06-30",
    financiamento: "FAPEMA",
    valor: 45000,
    descricao: "Desenvolvimento de modelos de machine learning para auxílio em diagnósticos de doenças pulmonares a partir de imagens de raio-X."
  },
  {
    titulo: "Análise de Sentimentos em Redes Sociais no Maranhão",
    orientador: "Dra. Ana Beatriz Lima",
    alunos: ["Lucas Gabriel Santos", "Rafael Pereira"],
    departamento: "Computação",
    status: "Em andamento",
    inicio: "2024-05-15",
    previsao_termino: "2025-05-15",
    financiamento: "CNPq",
    valor: 30000,
    descricao: "Estudo de técnicas de NLP para analisar opiniões sobre políticas públicas em redes sociais de usuários maranhenses."
  },
  {
    titulo: "Sistema de Gestão Acadêmica Inteligente",
    orientador: "Me. Roberto Farias",
    alunos: ["Enzo Carvalho"],
    departamento: "Computação",
    status: "Concluído",
    inicio: "2023-08-01",
    previsao_termino: "2024-12-15",
    financiamento: "Institucional",
    valor: 15000,
    descricao: "Desenvolvimento de um sistema web para gestão acadêmica com recomendação automática de disciplinas baseada no histórico do aluno."
  },
  {
    titulo: "Impacto da Telemedicina em Comunidades Ribeirinhas",
    orientador: "Dra. Fernanda Oliveira",
    alunos: ["Gabriel Almeida", "Valentina Barbosa"],
    departamento: "Ciências da Saúde",
    status: "Em andamento",
    inicio: "2024-02-01",
    previsao_termino: "2025-08-30",
    financiamento: "SUS/MS",
    valor: 80000,
    descricao: "Pesquisa sobre a efetividade da telemedicina para atendimento de populações ribeirinhas no interior do Maranhão."
  },
  {
    titulo: "Direitos Digitais e Proteção de Dados no Brasil",
    orientador: "Dr. Paulo Henrique Silva",
    alunos: ["Isabela Rodrigues", "Helena Ribeiro"],
    departamento: "Ciências Jurídicas",
    status: "Em andamento",
    inicio: "2024-06-01",
    previsao_termino: "2025-12-01",
    financiamento: "CAPES",
    valor: 25000,
    descricao: "Análise jurídica da LGPD e seus impactos na privacidade digital dos cidadãos brasileiros, com foco em casos do Nordeste."
  }
]);

// Eventos acadêmicos
db.eventos.insertMany([
  {
    nome: "Semana de Tecnologia CEUMA 2024",
    tipo: "Semana acadêmica",
    data_inicio: "2024-10-14",
    data_fim: "2024-10-18",
    local: "Auditório Central - Campus Renascença",
    organizador: "Departamento de Computação",
    palestrantes: ["Dr. Carlos Mendes", "Dra. Ana Beatriz Lima", "Convidado externo: Dr. André Lemos (UFBA)"],
    vagas: 200,
    inscritos: 187,
    descricao: "Evento anual com palestras, workshops e hackathon sobre temas como IA, cloud computing e segurança da informação."
  },
  {
    nome: "Simpósio de Saúde Pública do Maranhão",
    tipo: "Simpósio",
    data_inicio: "2024-09-05",
    data_fim: "2024-09-07",
    local: "Centro de Convenções - Campus Turu",
    organizador: "Departamento de Ciências da Saúde",
    palestrantes: ["Dra. Fernanda Oliveira", "Dr. Marcos Tavares (UFMA)"],
    vagas: 150,
    inscritos: 142,
    descricao: "Discussões sobre desafios da saúde pública no Maranhão, com ênfase em atenção básica e saúde da família."
  },
  {
    nome: "Jornada Jurídica: Direito e Tecnologia",
    tipo: "Jornada",
    data_inicio: "2024-11-20",
    data_fim: "2024-11-22",
    local: "Auditório do Bloco B - Campus Renascença",
    organizador: "Departamento de Ciências Jurídicas",
    palestrantes: ["Dr. Paulo Henrique Silva", "Dra. Cláudia Ferraz (TJ-MA)"],
    vagas: 120,
    inscritos: 98,
    descricao: "Jornada acadêmica sobre os desafios jurídicos da era digital, incluindo LGPD, crimes cibernéticos e processo judicial eletrônico."
  }
]);

// Publicações acadêmicas
db.publicacoes.insertMany([
  {
    titulo: "Deep Learning para Detecção de Pneumonia em Raio-X",
    autores: ["Dr. Carlos Mendes", "João Pedro Souza"],
    revista: "Revista Brasileira de Informática na Saúde",
    ano: 2024,
    doi: "10.1234/rbis.2024.001",
    tipo: "Artigo",
    resumo: "Este trabalho apresenta um modelo de CNN com 94% de acurácia na detecção de pneumonia em imagens de raio-X torácico."
  },
  {
    titulo: "Desafios da LGPD em Instituições de Ensino Superior",
    autores: ["Dr. Paulo Henrique Silva", "Isabela Rodrigues"],
    revista: "Revista de Direito Digital",
    ano: 2024,
    doi: "10.1234/rdd.2024.015",
    tipo: "Artigo",
    resumo: "Análise dos principais desafios enfrentados por universidades brasileiras na adequação à Lei Geral de Proteção de Dados."
  },
  {
    titulo: "NLP Aplicado à Análise de Políticas Públicas",
    autores: ["Dra. Ana Beatriz Lima", "Lucas Gabriel Santos", "Rafael Pereira"],
    revista: "Proceedings of BRACIS 2024",
    ano: 2024,
    doi: "10.1234/bracis.2024.089",
    tipo: "Conferência",
    resumo: "Proposta de pipeline de processamento de linguagem natural para análise automatizada de sentimentos em textos sobre políticas públicas."
  },
  {
    titulo: "Telemedicina no Maranhão: Um Estudo de Caso",
    autores: ["Dra. Fernanda Oliveira", "Gabriel Almeida"],
    revista: "Cadernos de Saúde Pública",
    ano: 2024,
    doi: "10.1234/csp.2024.045",
    tipo: "Artigo",
    resumo: "Estudo sobre a implementação de serviços de telemedicina em 12 municípios ribeirinhos do Maranhão, com resultados promissores na redução de deslocamentos."
  }
]);
