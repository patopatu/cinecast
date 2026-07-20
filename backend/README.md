# 🎬 Cine Cast — Backend

API da plataforma Cine Cast construída com Node.js/Express.

## 🚀 Setup

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

O servidor estará disponível em [http://localhost:3001](http://localhost:3001).

## 📁 Estrutura

```
src/
├── routes/          # Rotas da API
├── controllers/     # Controllers
├── services/        # Serviços de negócio
├── models/          # Modelos de dados
├── middleware/      # Middlewares
├── utils/           # Utilitários
└── config/          # Configurações
```

## 🛠️ Scripts

- `npm run dev` - Inicia dev server
- `npm run build` - Build para produção
- `npm run lint` - Verifica erros com ESLint
- `npm run test` - Roda testes

## 📚 Banco de Dados

```bash
# Criar migrações
npx prisma migrate dev --name migration_name

# Seed do banco
npx prisma db seed

# Abrir Prisma Studio
npx prisma studio
```

---

**ENTRE EM CENA** — Construído por quem acredita no audiovisual.