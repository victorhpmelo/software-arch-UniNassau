# FinanJovem — Sistema de Controle Financeiro

Sistema completo de gestão financeira para jovens empreendedores, com **Spring Boot** no backend, **React** no frontend e **PostgreSQL** em Docker.

## Tecnologias

| Camada | Stack |
|--------|-------|
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA, PostgreSQL |
| Frontend | React 18, Vite, Tailwind CSS, Axios, Lucide Icons |
| Infra | Docker Compose (PostgreSQL + API + Frontend) |

## Histórias de Usuário

Documentação completa em [`docs/HISTORIAS_DE_USUARIO.md`](docs/HISTORIAS_DE_USUARIO.md) (persona, regras de negócio, critérios de aceite e rastreabilidade técnica).

| ID | História | Prioridade |
|----|----------|------------|
| HU-01 | Registrar transação financeira | Alta |
| HU-02 | Visualizar resumo financeiro | Alta |
| HU-03 | Filtrar histórico de transações | Média |
| HU-04 | Editar e excluir transações | Alta |

---

## Estrutura do Projeto

```
software-arch-UniNassau/
├── backend/                 # API Spring Boot
│   └── src/main/java/com/finanjovem/
├── frontend/                # React + Vite + Tailwind
│   └── src/components/
├── docker-compose.yml       # Postgres + Backend + Frontend
└── README.md
```

## Como Executar com Docker

### Pré-requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução

### Subir todos os serviços

Execute sempre na **raiz do projeto** (não dentro de `frontend/` ou `backend/`):

```bash
cd /c/workspace/FullStack/software-arch-UniNassau
docker compose up -d --build
```

Para acompanhar os logs:

```bash
docker compose logs -f
```

> **Importante:** `docker compose up` (sem `-d`) mantém o terminal preso aos logs. Se você pressionar **Ctrl+C**, todos os containers param — isso é normal. O backend leva ~15–20s para subir; use `-d` para rodar em segundo plano.

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend (API) | http://localhost:8080/api |
| PostgreSQL | localhost:5433 (host; porta 5432 no host costuma estar ocupada) |

### Parar os serviços

```powershell
docker compose down
```

### Remover dados do banco

```powershell
docker compose down -v
```

Use `-v` se o Postgres foi criado antes com outro banco/senha (volume antigo) e o backend não conecta.

### Erro de conexão com PostgreSQL

Se aparecer `PSQLException: The connection attempt failed`:

```powershell
docker compose down
docker compose up -d --build
```

O backend aguarda o Postgres ficar disponível antes de iniciar. Se persistir, recrie o volume:

```powershell
docker compose down -v
docker compose up -d --build
```

## Desenvolvimento Local (sem Docker para app)

### 1. Banco de dados

```powershell
docker compose up -d postgres
```

### 2. Backend

```powershell
cd backend
mvn spring-boot:run
```

### 3. Frontend

```powershell
cd frontend
npm install
npm run dev
```

Acesse http://localhost:3000 (Vite). A API padrão é `http://localhost:8080/api`.

## API REST

Base URL: `http://localhost:8080/api`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/transacoes` | Criar transação |
| GET | `/transacoes` | Listar + resumo financeiro |
| GET | `/transacoes/{id}` | Buscar por ID |
| PUT | `/transacoes/{id}` | Atualizar |
| DELETE | `/transacoes/{id}` | Excluir |
| GET | `/resumo/categorias` | Resumo por categoria |

### Exemplo de corpo (POST/PUT)

```json
{
  "descricao": "Venda de produto artesanal",
  "valor": 150.00,
  "tipo": "Receita",
  "categoria": "Venda de Produto",
  "data": "2025-12-04",
  "observacoes": "Primeira venda do mês"
}
```

## Configuração do Banco

| Variável | Padrão |
|----------|--------|
| DB_HOST | localhost (postgres no Docker) |
| DB_PORT | 5432 |
| DB_USER | admin |
| DB_PASSWORD | admin123 |
| DB_NAME | finanjovem_db |

## Documentação

- [Histórias de Usuário](docs/HISTORIAS_DE_USUARIO.md) — backlog, persona, critérios de aceite e rastreabilidade

## Disciplina

- **Projeto**: FinanJovem — Controle Financeiro para Jovens Empreendedores
- **Base**: [victorhpmelo/SysMod](https://github.com/victorhpmelo/SysMod)
- **Disciplina**: Análise e Modelagem de Sistemas

## Licença

Projeto educacional.
