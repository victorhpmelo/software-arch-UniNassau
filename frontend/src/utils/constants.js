export const CATEGORIAS = [
  'Venda de Produto',
  'Prestação de Serviço',
  'Investimento',
  'Matéria Prima',
  'Marketing',
  'Transporte',
  'Equipamentos',
  'Aluguel',
  'Internet/Telefone',
  'Doação',
  'Prêmio/Edital',
  'Outros',
];

export const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);

export const formatDate = (date) =>
  new Date(date + 'T00:00:00').toLocaleDateString('pt-BR');
