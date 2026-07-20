# 🎬 Cine Cast — Entre em Cena

Uma plataforma colaborativa que conecta pessoas, projetos e oportunidades do audiovisual.

## 📋 Sobre o Projeto

O Cine Cast é uma rede colaborativa do audiovisual que busca:

- **Aproximar pessoas e projetos**: Conectar profissionais, talentos e produtoras
- **Ampliar oportunidades**: Tornar chamadas, casting e projetos mais acessíveis
- **Construir conhecimento coletivo**: Blog colaborativo, biblioteca de recursos e comunidade
- **Acolher diversidade**: Desde iniciantes até profissionais consolidados
- **Facilitar encontros**: Pessoas encontram oportunidades, projetos encontram equipes

## 🎯 Valores Principais

- ✨ **Criatividade** — O audiovisual nasce da criatividade
- 🚀 **Liberdade** — Espaço para diferentes formas de produzir
- 🔗 **Conexão** — Aproximar é o princípio central
- 🤝 **Colaboração** — Audiovisual é feito em conjunto
- 🌈 **Diversidade** — Múltiplas perspectivas e experiências
- 🎬 **Audiovisual** — Integrado em toda a experiência

## 🏗️ Stack Tecnológico

### Frontend
- **Framework**: React 18+ / Next.js 14+
- **Styling**: Tailwind CSS + Custom CSS
- **State Management**: Context API / Zustand
- **UI Components**: Headless UI + Custom components
- **Accessibility**: WCAG 2.1 AA compliant
- **Icons**: Phosphor Icons
- **Fonts**: Space Grotesk, DM Mono, Atkinson Hyperlegible, Inter

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js / Fastify
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + OAuth 2.0
- **File Storage**: AWS S3 / Local storage
- **Real-time**: WebSockets / Socket.io

### Infrastructure
- **Hosting**: Vercel (Frontend) / Railway/Render (Backend)
- **Database**: PostgreSQL (managed)
- **CDN**: Cloudflare
- **Email**: SendGrid / Resend
- **Search**: Meilisearch / Elasticsearch

## 📁 Estrutura do Projeto

```
cinecast/
├── frontend/                 # Aplicação React/Next.js
├── backend/                  # API Express/Fastify
├── database/                 # Schemas e migrations
├── docs/                     # Documentação
├── design-system/            # Componentes e guia de estilo
└── scripts/                  # Utilitários e automações
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- Git

### Setup do Frontend

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### Setup do Backend

```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npm run dev
```

## 📚 Documentação

- [Brand Guidelines](./docs/BRAND_GUIDELINES.md) — Identidade visual e comunicação
- [API Documentation](./docs/API.md) — Endpoints e especificações
- [Database Schema](./docs/DATABASE.md) — Estrutura de dados
- [Contributing](./CONTRIBUTING.md) — Como contribuir

## 🎨 Identidade Visual

### Paleta de Cores
- **Azul-preto**: `#111020` (fundo principal)
- **Preto**: `#000000` (estrutura)
- **Roxo**: `#A98CFF` (destaque/ação)
- **Lilás**: `#E7DAFF` (secundária)
- **Branco lilás**: `#F4F0FF` (texto confortável)
- **Branco**: `#FFFFFF` (contraste máximo)

### Logo
A logo representa a mão em forma de "C" segurando películas cinematográficas, simbolizando a construção coletiva do audiovisual.

## 🔄 Ciclo de Participação

1. **Descobrir** — Encontrar pessoas, projetos, conhecimentos e oportunidades
2. **Participar** — Entrar em conversas, equipes, formações ou produções
3. **Construir** — Criar projetos, experiências, documentos e repertórios
4. **Compartilhar** — Devolver conhecimento e abrir caminhos
5. **Ajudar** — Criar oportunidades para outras pessoas

## 📦 Features Principais

### MVP 1.0
- ✅ Sistema de autenticação
- ✅ Perfis de usuários (talentos/produtores)
- ✅ Publicação de chamadas/casting
- ✅ Discover feed com filtros
- ✅ Gerenciamento de projetos
- ✅ Sistema de salvos
- ✅ Acessibilidade integrada

### Futuro
- 📅 Comunidade (blog colaborativo)
- 📚 Biblioteca de recursos
- 💬 Sistema de mensagens
- 🔔 Notificações em tempo real
- 📊 Análises e relatórios
- 🎓 Formações e eventos

## 🤝 Contribuindo

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para detalhes sobre como contribuir com o projeto.

## 📄 Licença

Este projeto está sob licença [MIT](./LICENSE).

## 📧 Contato

- **Email**: contato@cinecast.com.br
- **Website**: https://cinecast.com.br
- **Instagram**: @cinecast_br

---

**ENTRE EM CENA** — Construído por quem acredita no audiovisual.