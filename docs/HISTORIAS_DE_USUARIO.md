# Histórias de Usuário — FinanJovem

**Projeto:** Sistema de Controle Financeiro para Jovens Empreendedores  
**Disciplina:** Análise e Modelagem de Sistemas  
**Versão:** 1.0

---

## Persona

| Campo | Descrição |
|-------|-----------|
| **Nome** | Ana, a empreendedora iniciante |
| **Perfil** | Jovem de 18–25 anos, dona de um pequeno negócio (artesanato, serviços ou revenda) |
| **Objetivo** | Organizar entradas e saídas de dinheiro sem planilhas complexas |
| **Dores** | Esquece lançamentos, não sabe o saldo real, mistura gastos pessoais e do negócio |
| **Expectativa** | Interface simples, rápida e acessível no computador ou celular |

---

## Épico

**Gestão financeira do microempreendimento** — permitir que o jovem empreendedor registre, consulte, analise e corrija movimentações financeiras (receitas e despesas) de forma centralizada e persistente.

---

## HU-01 — Registrar transação financeira

| Atributo | Valor |
|----------|-------|
| **ID** | HU-01 |
| **Prioridade** | Alta |
| **Estimativa** | 5 pontos |
| **Status** | Implementada |

### Narrativa

**Como** jovem empreendedor  
**Quero** cadastrar receitas e despesas informando descrição, valor, tipo, categoria, data e observações opcionais  
**Para** manter um registro organizado e confiável de todas as movimentações do meu negócio

### Regras de negócio

1. Descrição, valor, tipo, categoria e data são obrigatórios.
2. O valor deve ser numérico e maior que zero.
3. O tipo aceito é `Receita` ou `Despesa`.
4. As categorias disponíveis incluem: Venda de Produto, Prestação de Serviço, Investimento, Matéria Prima, Marketing, Transporte, Equipamentos, Aluguel, Internet/Telefone, Doação, Prêmio/Edital e Outros.
5. A data padrão do formulário é a data atual.
6. Os dados devem ser persistidos no banco PostgreSQL.

### Critérios de aceite

| # | Cenário | Resultado esperado |
|---|---------|-------------------|
| CA-01.1 | Preencho todos os campos obrigatórios e salvo uma receita | Transação criada com sucesso e mensagem de confirmação exibida |
| CA-01.2 | Preencho todos os campos obrigatórios e salvo uma despesa | Transação criada e classificada como Despesa |
| CA-01.3 | Tento salvar sem descrição ou valor | Sistema impede o envio e indica campos obrigatórios |
| CA-01.4 | Informo valor zero ou negativo | API retorna erro de validação |
| CA-01.5 | Altero o tipo de Receita para Despesa | Lista de categorias permanece disponível (categorias compartilhadas) |

### Rastreabilidade técnica

| Item | Referência |
|------|------------|
| Tela | Nova transação (`TransactionForm.jsx`) |
| Endpoint | `POST /api/transacoes` |
| Entidade | `Transacao` |

---

## HU-02 — Visualizar resumo financeiro

| Atributo | Valor |
|----------|-------|
| **ID** | HU-02 |
| **Prioridade** | Alta |
| **Estimativa** | 5 pontos |
| **Status** | Implementada |

### Narrativa

**Como** jovem empreendedor  
**Quero** visualizar um painel com totais de receitas, despesas, saldo e quantidade de transações  
**Para** entender rapidamente a saúde financeira do meu empreendimento e tomar decisões com base em dados reais

### Regras de negócio

1. **Total de receitas:** soma dos valores de todas as transações do tipo Receita.
2. **Total de despesas:** soma dos valores absolutos das transações do tipo Despesa.
3. **Saldo:** total de receitas − total de despesas.
4. **Resumo por categoria:** agrupa valores por categoria, separando receitas e despesas.
5. **Últimas transações:** exibe as 5 movimentações mais recentes (ordenadas por data).

### Critérios de aceite

| # | Cenário | Resultado esperado |
|---|---------|-------------------|
| CA-02.1 | Acesso a tela de Resumo sem transações | Cards exibem R$ 0,00 e mensagem informativa nas listas |
| CA-02.2 | Existem receitas e despesas cadastradas | Cards mostram valores corretos e saldo calculado |
| CA-02.3 | Visualizo resumo por categoria | Cada categoria exibe o total líquido (receitas − despesas da categoria) |
| CA-02.4 | Cadastro nova transação e volto ao resumo | Valores e listas são atualizados automaticamente |

### Rastreabilidade técnica

| Item | Referência |
|------|------------|
| Tela | Resumo financeiro (`Dashboard.jsx`) |
| Endpoints | `GET /api/transacoes`, `GET /api/resumo/categorias` |
| Componentes | `StatCard.jsx` |

---

## HU-03 — Filtrar histórico de transações

| Atributo | Valor |
|----------|-------|
| **ID** | HU-03 |
| **Prioridade** | Média |
| **Estimativa** | 3 pontos |
| **Status** | Implementada |

### Narrativa

**Como** jovem empreendedor  
**Quero** buscar transações por descrição e filtrar por tipo e categoria  
**Para** localizar lançamentos específicos sem precisar percorrer manualmente toda a lista

### Regras de negócio

1. A busca por descrição é case-insensitive e aceita correspondência parcial.
2. O filtro por tipo permite: todos, apenas Receita ou apenas Despesa.
3. O filtro por categoria lista todas as categorias do sistema.
4. Os filtros podem ser combinados simultaneamente.
5. A filtragem ocorre no frontend, sem nova requisição à API a cada tecla.

### Critérios de aceite

| # | Cenário | Resultado esperado |
|---|---------|-------------------|
| CA-03.1 | Digito parte da descrição na busca | Apenas transações compatíveis aparecem na tabela |
| CA-03.2 | Seleciono filtro "Receitas" | Somente transações do tipo Receita são exibidas |
| CA-03.3 | Seleciono uma categoria específica | Somente transações daquela categoria aparecem |
| CA-03.4 | Aplico busca + tipo + categoria | Resultado respeita os três critérios ao mesmo tempo |
| CA-03.5 | Nenhuma transação atende aos filtros | Mensagem "Nenhuma transação encontrada" é exibida |

### Rastreabilidade técnica

| Item | Referência |
|------|------------|
| Tela | Histórico (`TransactionHistory.jsx`) |
| Endpoint | `GET /api/transacoes` |
| Lógica | Filtros em `useMemo` no componente |

---

## HU-04 — Editar e excluir transações

| Atributo | Valor |
|----------|-------|
| **ID** | HU-04 |
| **Prioridade** | Alta |
| **Estimativa** | 5 pontos |
| **Status** | Implementada |

### Narrativa

**Como** jovem empreendedor  
**Quero** editar ou excluir transações já cadastradas  
**Para** corrigir erros de lançamento e manter meus dados financeiros confiáveis

### Regras de negócio

1. Ao editar, o formulário é preenchido com os dados atuais da transação.
2. A atualização segue as mesmas validações do cadastro (HU-01).
3. A exclusão exige confirmação do usuário antes de prosseguir.
4. Após editar ou excluir, o resumo financeiro e o histórico devem refletir a alteração.
5. Não é possível editar ou excluir transação inexistente (retorno 404 da API).

### Critérios de aceite

| # | Cenário | Resultado esperado |
|---|---------|-------------------|
| CA-04.1 | Clico em editar em uma transação | Formulário abre na aba "Nova transação" com dados preenchidos |
| CA-04.2 | Altero valor e salvo | API atualiza registro e exibe mensagem de sucesso |
| CA-04.3 | Clico em excluir e confirmo | Transação removida do banco e da listagem |
| CA-04.4 | Clico em excluir e cancelo | Nenhuma alteração é feita |
| CA-04.5 | Edito ou excluo e volto ao resumo | Totais e últimas transações estão atualizados |

### Rastreabilidade técnica

| Item | Referência |
|------|------------|
| Telas | Histórico + Formulário (`TransactionHistory.jsx`, `TransactionForm.jsx`) |
| Endpoints | `PUT /api/transacoes/{id}`, `DELETE /api/transacoes/{id}` |

---

## Mapa de rastreabilidade

| História | Funcionalidade | API | Persistência |
|----------|----------------|-----|--------------|
| HU-01 | Cadastro de transação | POST | PostgreSQL |
| HU-02 | Dashboard / resumo | GET | PostgreSQL |
| HU-03 | Filtros no histórico | GET | PostgreSQL |
| HU-04 | Edição e exclusão | PUT, DELETE | PostgreSQL |

---

## Priorização (Product Backlog)

| Ordem | ID | História | Prioridade |
|-------|-----|----------|------------|
| 1 | HU-01 | Registrar transação | Alta |
| 2 | HU-02 | Visualizar resumo | Alta |
| 3 | HU-04 | Editar e excluir | Alta |
| 4 | HU-03 | Filtrar histórico | Média |

---

## Definição de pronto (DoD)

Uma história é considerada **pronta** quando:

- [x] Critérios de aceite validados manualmente na aplicação
- [x] Endpoint REST documentado e funcional
- [x] Dados persistidos no PostgreSQL via Docker
- [x] Interface React integrada à API
- [x] Fluxo testado com `docker compose up -d --build`
