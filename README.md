# 🚜 Brain Agro - Sistema de Gestão Agrícola

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-000000?logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-6.8.2-2D3748?logo=prisma)
![SQLite](https://img.shields.io/badge/SQLite-5.1.7-003B57?logo=sqlite)
![Mantine](https://img.shields.io/badge/Mantine-8.0.2-339AF0)

## 📋 Índice
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Configuração do Banco](#-banco-de-dados-sqlite)
- [Rotas API](#-rotas-da-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Desenvolvimento](#-desenvolvimento)
- [Testes](#-testes)
- [Deploy](#-deploy)
- [Solução de Problemas](#-solução-de-problemas)
- [Migração para Produção](#-migração-para-produção)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

## 📋 Requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior
- SQLite3 (incluído nas dependências)

## 🛠️ Instalação

1. **Clone o repositório**:
```bash
git clone https://github.com/seu-usuario/brain-agro.git
cd brain-agro
Instale as dependências:


npm install
Configure o banco de dados SQLite:


npx prisma generate
npx prisma migrate dev --name init
Configure as variáveis de ambiente:


cp .env.example .env
Edite o arquivo .env com suas configurações.
```
### 🗃️ Banco de Dados SQLite
```bash
Configuração do Schema
prisma
// prisma/schema.prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Produtor {
  id        Int      @id @default(autoincrement())
  nome      String
  documento String   @unique
  fazendas  Fazenda[]
}

model Fazenda {
  id               Int     @id @default(autoincrement())
  nome             String
  totalHectares    Float
  areaAgricultavel Float
  areaVegetacao    Float
  culturas         String
  estado           String
  cidade           String
  produtor         Produtor @relation(fields: [produtorId], references: [id])
  produtorId       Int
}
```

### Comandos do Prisma
```bash
npx prisma studio       # Interface visual do banco
npx prisma migrate dev  # Criar e aplicar migrações
npx prisma generate     # Gerar cliente do Prisma
```
### 🌐 Rotas da API
```bash
Produtores
GET /api/produtores - Lista produtores com paginação

POST /api/produtores - Cria novo produtor

GET /api/produtores/[id] - Obtém detalhes do produtor

PUT /api/produtores/[id] - Atualiza produtor

DELETE /api/produtores/[id] - Remove produtor

Exemplo de Request
bash
POST /api/produtores
Content-Type: application/json

{
  "nomeProdutor": "Fazenda São João",
  "documento": "123.456.789-00",
  "nomeFazenda": "Fazenda Modelo",
  "totalHectares": 1500,
  "areaAgricultavel": 800,
  "areaVegetacao": 500,
  "culturasPlantadas": ["Soja", "Milho"],
  "estado": "SP",
  "cidade": "Ribeirão Preto"
}
```
### 📂 Estrutura do Projeto
```bash
brain-agro/
├── src/
│   ├── app/
│   │   ├── api/              # Backend (Rotas API)
        └── dashboard/
│   │   │       ├── route.ts             
│   │   └── produtores/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   └── (pages)            # Frontend (Next.js App Router)
│   ├── components/
│   ├── lib/
│   │   └── prisma.ts         
│   └── styles/
├── prisma/                    
│   ├── schema.prisma
│   └── migrations/
├── .env
├── package.json
└── tsconfig.json

```

### 💻 Desenvolvimento
```bash
Inicie o servidor de desenvolvimento:

bash
npm run dev
Acesse no navegador:

http://localhost:3000
Monitoramento do banco:
npx prisma studio

```

### 🧪 Testes
```bash
npm test           # Executa todos os testes
npm run test:watch # Modo watch
🚀 Deploy
Build para produção:
bash
npm run build
Iniciar servidor de produção:
bash
npm start
```

### 🚨 Solução de Problemas
```bash
Erros comuns e soluções:
Erro de tipo no Prisma:

typescript
// Adicione no topo do arquivo problemático
// @ts-nocheck
/* eslint-disable */
npx prisma migrate reset
npx prisma migrate dev
```


### 📈 Migração para Produção
```bash
Para migrar para PostgreSQL em produção:

Altere o schema.prisma:

prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
Atualize o .env com a URL do PostgreSQL:

env
DATABASE_URL="postgresql://user:password@localhost:5432/brainagro"
```