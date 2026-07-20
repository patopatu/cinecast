# 🚀 Cine Cast — Roadmap de Desenvolvimento

## 📋 Ordem Ideal de Programação

Este documento define a sequência ótima para construir a plataforma de forma funcional e escalável.

---

## 🎯 Fase 1: Fundação (Semanas 1-2)

### 1.1 Configuração de Infraestrutura
**Objetivo**: Ter ambiente pronto para desenvolvimento

- [ ] Setup PostgreSQL local e cloud
- [ ] Configurar Prisma ORM
- [ ] Setup CI/CD básico (GitHub Actions)
- [ ] Configurar variáveis de ambiente
- [ ] Setup Docker (opcional para desenvolvimento)

**Entrega**: Banco de dados funcional e pronto para migrations

---

### 1.2 Prisma Schema Completo
**Objetivo**: Definir modelo de dados robusto

Criar `backend/prisma/schema.prisma` com:
- [ ] Tabela Users (com role, preferences)
- [ ] Tabela UserProfiles (expertise, experience_level)
- [ ] Tabela Projects (type, status, visibility)
- [ ] Tabela Opportunities (casting, crew, etc)
- [ ] Tabela Applications (candidaturas)
- [ ] Tabela ProjectTeam (membros)
- [ ] Tabela Content (blog, articles, tips)
- [ ] Tabela Resources (templates, checklists)
- [ ] Tabela Comments (em conteúdo)
- [ ] Tabela SavedItems
- [ ] Tabela Follows
- [ ] Tabela Notifications
- [ ] Índices otimizados

**Entrega**: Schema completo com relacionamentos

```bash
npx prisma migrate dev --name initial_schema
npx prisma generate
```

---

### 1.3 Backend Boilerplate
**Objetivo**: API scaffolding básico

Criar estrutura:
```
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── auth.ts
│   │   └── server.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── validation.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── auth.ts
│   │   ├── users.ts
│   │   ├── projects.ts
│   │   ├── opportunities.ts
│   │   ├── content.ts
│   │   └── resources.ts
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── usersController.ts
│   │   └── [outros]
│   ├── services/
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   └── [outros]
│   ├── types/
│   │   ├── index.ts
│   │   └── api.ts
│   ├── utils/
│   │   ├── jwt.ts
│   │   ├── validation.ts
│   │   └── errors.ts
│   └── index.ts
├── .env.example
└── package.json
```

- [ ] Express setup com TypeScript
- [ ] Middleware de erro
- [ ] CORS configurado
- [ ] Health check endpoint
- [ ] Logging básico

**Entrega**: Servidor rodando em `localhost:3001`

---

## 🎯 Fase 2: Autenticação (Semana 2-3)

### 2.1 Sistema de Autenticação
**Objetivo**: Usuários podem registrar e fazer login

Implementar em `backend/src/services/authService.ts`:

- [ ] Hash de senha (bcrypt)
- [ ] JWT token generation/validation
- [ ] Refresh token logic
- [ ] Email verification (opcional MVP)
- [ ] Password reset flow (opcional MVP)

Endpoints:
```
POST /auth/register
POST /auth/login
POST /auth/refresh
POST /auth/logout
```

**Validações**:
- Email único
- Senha forte (mínimo 8 caracteres, complexidade)
- Username único (3-50 caracteres)

**Entrega**: Autenticação JWT funcional

---

### 2.2 User Profile Management
**Objetivo**: Usuários podem editar perfil

Endpoints:
```
GET /users/me
PATCH /users/me
GET /users/:username
GET /users/:username/profile
```

Campos gerenciais:
- Avatar
- Bio
- Localização
- Expertise areas
- Portfolio URL
- Social links
- Preferences (tema, idioma, acessibilidade)

**Entrega**: CRUD básico de perfil

---

## 🎯 Fase 3: Dados Públicos (Semana 3-4)

### 3.1 Projects - CRUD Completo
**Objetivo**: Produtores podem criar projetos

Endpoints:
```
GET /projects (com filtros)
POST /projects
GET /projects/:slug
PATCH /projects/:slug
DELETE /projects/:slug
GET /projects/:slug/team
GET /projects/:slug/opportunities
```

Funcionalidades:
- [ ] Criar projeto em fases (idea → finished)
- [ ] Upload de cover image
- [ ] Filtros: type, status, genre, location
- [ ] Paginação (10 itens/página)
- [ ] Busca por título/descrição
- [ ] Only creator pode editar/deletar

**Entrega**: Gestão completa de projetos

---

### 3.2 Opportunities - CRUD Completo
**Objetivo**: Chamadas abertas para candidatos

Endpoints:
```
GET /opportunities (com filtros)
POST /opportunities
GET /opportunities/:slug
PATCH /opportunities/:slug
DELETE /opportunities/:slug
GET /opportunities/:slug/applications
```

Funcionalidades:
- [ ] Criar chamada (casting, crew, internship)
- [ ] Filtros: type, department, location, is_remote, is_paid
- [ ] Deadline validation
- [ ] Status workflow (draft → published → filled/closed)
- [ ] Contador de aplicações
- [ ] Notificar creator quando houver candidaturas

**Entrega**: Sistema de oportunidades funcional

---

### 3.3 Applications - Candidaturas
**Objetivo**: Usuários se candidatam a oportunidades

Endpoints:
```
POST /opportunities/:slug/applications
GET /opportunities/:slug/applications
PATCH /applications/:id/status
GET /users/me/applications
```

Funcionalidades:
- [ ] Submit candidatura com cover letter
- [ ] Adicionar portfolio links
- [ ] Status: submitted → reviewing → accepted/rejected
- [ ] Notificação para candidato
- [ ] Uma candidatura por oportunidade

**Entrega**: Fluxo de candidaturas completo

---

## 🎯 Fase 4: Comunidade (Semana 4-5)

### 4.1 Content - Blog Colaborativo
**Objetivo**: Comunidade publica conhecimento

Endpoints:
```
GET /content (com filtros)
POST /content
GET /content/:slug
PATCH /content/:slug
DELETE /content/:slug
POST /content/:slug/comments
GET /content/:slug/comments
```

Tipos:
- Article (longo, estruturado)
- Tip (curto, prático)
- Experience (relato)
- Question (pergunta aberta)
- Process (processo criativo)

Funcionalidades:
- [ ] Markdown support
- [ ] Tagging
- [ ] Draft/Published/Archived states
- [ ] Reading time calc
- [ ] Estatísticas (views, likes, comments)

**Entrega**: Comunidade pode publicar conteúdo

---

### 4.2 Resources - Biblioteca de Modelos
**Objetivo**: Compartilhar templates e documentos

Endpoints:
```
GET /resources
POST /resources
GET /resources/:slug
PATCH /resources/:slug
GET /resources/:slug/versions
```

Tipos:
- Template (editável)
- Checklist
- Guide
- Tool
- Document

Funcionalidades:
- [ ] Versionamento (1.0, 1.1, etc)
- [ ] File upload
- [ ] Status: draft → published → update_needed
- [ ] Usage counter

**Entrega**: Biblioteca de recursos

---

### 4.3 Comments e Interações
**Objetivo**: Comunidade discute e interage

Endpoints:
```
POST /content/:slug/comments
GET /content/:slug/comments
PATCH /comments/:id
DELETE /comments/:id
POST /content/:slug/like
DELETE /content/:slug/like
```

Funcionalidades:
- [ ] Comentários aninhados (parent_comment_id)
- [ ] Like/unlike
- [ ] Notificar author
- [ ] Author pode ocultar/deletar

**Entrega**: Interação comunitária

---

## 🎯 Fase 5: Social Features (Semana 5-6)

### 5.1 Follow System
**Objetivo**: Usuários seguem uns aos outros

Endpoints:
```
POST /users/:userId/follow
DELETE /users/:userId/follow
GET /users/:username/followers
GET /users/:username/following
```

Funcionalidades:
- [ ] Follow/unfollow
- [ ] Notificar quando alguém te segue
- [ ] Listar seguidores
- [ ] Update follower count

**Entrega**: Sistema de followers

---

### 5.2 Saved Items
**Objetivo**: Usuários salvam conteúdo interessante

Endpoints:
```
GET /saved
POST /saved
DELETE /saved/:id
```

Funcionalidades:
- [ ] Salvar: projects, opportunities, content, resources, people
- [ ] Listar salvos por tipo
- [ ] Unique constraint (user + item_type + item_id)

**Entrega**: Sistema de salvos

---

### 5.3 Notifications
**Objetivo**: Usuários recebem notificações

Endpoints:
```
GET /notifications
PATCH /notifications/:id/read
PATCH /notifications/read-all
DELETE /notifications/:id
```

Eventos que geram notificação:
- [ ] Alguém te seguiu
- [ ] Nova candidatura na sua chamada
- [ ] Alguém comentou no seu conteúdo
- [ ] Você foi adicionado a um projeto
- [ ] Alguém respondeu seu comentário

**Entrega**: Sistema de notificações

---

## 🎯 Fase 6: Frontend MVP (Semana 6-8)

### 6.1 Setup e Layout Base
**Objetivo**: Framework pronto

- [ ] Next.js 14+ setup
- [ ] TypeScript configurado
- [ ] Tailwind CSS + custom CSS
- [ ] Layout principal (header, sidebar, footer)
- [ ] Componentes base (Button, Card, Modal, Form)
- [ ] Dark mode (padrão)
- [ ] Acessibilidade (ARIA, keyboard nav)

**Estrutura:**
```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── [outros]
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   └── [features]
│   ├── pages/
│   │   ├── index.tsx (home)
│   │   ├── auth/
│   │   ├── projects/
│   │   ├── opportunities/
│   │   └── [outras]
│   ├── styles/
│   │   ├── globals.css
│   │   ├── theme.css
│   │   └── [componentes]
│   ├── lib/
│   │   ├── api.ts (fetch wrapper)
│   │   ├── auth.ts
│   │   └── storage.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   └── [outros]
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   └── types/
│       └── index.ts
```

**Entrega**: Framework pronto para componentes

---

### 6.2 Autenticação Frontend
**Objetivo**: Login e registro funcionam

Páginas:
- [ ] /auth/register
- [ ] /auth/login
- [ ] /auth/forgot-password (opcional MVP)

Funcionalidades:
- [ ] Formulários validados
- [ ] JWT token em localStorage/cookie
- [ ] Redirect para login se deslogado
- [ ] Proteção de rotas privadas
- [ ] Erro messages claras

**Entrega**: Sistema de auth completo no frontend

---

### 6.3 Home Page & Landing
**Objetivo**: Primeira impressão visual

Seções:
- [ ] Hero com CTA
- [ ] Live strip (atividades recentes)
- [ ] Discover preview (6 cards)
- [ ] Projects preview (3 cards)
- [ ] Talents preview (3 perfis)
- [ ] Community preview
- [ ] Final CTA

Features:
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Acessibilidade (WCAG AA)
- [ ] Performance (Lighthouse > 90)
- [ ] SEO básico

**Entrega**: Home page funcional

---

### 6.4 Discover Feed
**Objetivo**: Usuários exploram conteúdo

Componentes:
- [ ] Tabs (Tudo, Oportunidades, Projetos, Conteúdos, Recursos)
- [ ] Filtro por busca
- [ ] Cards com tipos diferentes
- [ ] Paginação / Infinite scroll
- [ ] Save button
- [ ] Skeleton loading

Funcionalidades:
- [ ] Fetch de `/projects` com filtros
- [ ] Fetch de `/opportunities` com filtros
- [ ] Fetch de `/content` com filtros
- [ ] Fetch de `/resources` com filtros
- [ ] Integrado com gerenciamento de estado

**Entrega**: Discover feed funcional

---

### 6.5 Project Detail Page
**Objetivo**: Ver detalhes do projeto

Componentes:
- [ ] Header com info do projeto
- [ ] Cover image
- [ ] Descrição e sinopse
- [ ] Status e badges
- [ ] Team members grid
- [ ] Tabs: Diário, Equipe, Arquivos, Como Apoiar
- [ ] Related opportunities
- [ ] Save button
- [ ] Share button

**Entrega**: Página de projeto

---

### 6.6 User Profile Page
**Objetivo**: Ver perfil público de usuários

Componentes:
- [ ] Avatar e info básica
- [ ] Bio
- [ ] Expertise areas (tags)
- [ ] Estatísticas (projetos, seguidores, contributions)
- [ ] Follow/unfollow button
- [ ] Tabs: Portfólio, Projetos, Contribuições
- [ ] Portfolio items grid

**Entrega**: Página de perfil público

---

### 6.7 Opportunity Detail & Apply
**Objetivo**: Candidatos visualizam e se candidatam

Componentes:
- [ ] Opportunity header
- [ ] Descrição completa
- [ ] Requisitos e detalhes
- [ ] Deadline countdown
- [ ] Applied button / Apply form
- [ ] Relacionado ao projeto
- [ ] Estatísticas (views, aplicações)

Form:
- [ ] Cover letter textarea
- [ ] Portfolio links input
- [ ] Checkbox de termos
- [ ] Submit button

**Entrega**: Sistema de candidaturas no frontend

---

## 🎯 Fase 7: Dashboard do Usuário (Semana 8-9)

### 7.1 Profile Settings
**Objetivo**: Usuários gerenciam seu perfil

Página `/profile/settings`:
- [ ] Avatar upload
- [ ] Editar nome, bio, localização
- [ ] Expertise areas (multiselect)
- [ ] Experience level (select)
- [ ] Portfolio URL
- [ ] Social links
- [ ] Preferências (theme, language, accessibility)
- [ ] Privacidade (visibility)
- [ ] Save changes

**Entrega**: Edição de perfil

---

### 7.2 My Projects
**Objetivo**: Produtor gerencia seus projetos

Página `/dashboard/projects`:
- [ ] Lista de meus projetos
- [ ] Status badges
- [ ] Quick actions (edit, view, delete)
- [ ] Create new button
- [ ] Filtros (status, type)

**Entrega**: Gerenciador de projetos

---

### 7.3 My Opportunities
**Objetivo**: Produtor gerencia suas chamadas

Página `/dashboard/opportunities`:
- [ ] Lista de minhas oportunidades
- [ ] Status badges
- [ ] Aplicações count
- [ ] Quick actions
- [ ] Create new button

**Entrega**: Gerenciador de oportunidades

---

### 7.4 My Applications
**Objetivo**: Candidato acompanha candidaturas

Página `/dashboard/applications`:
- [ ] Lista de candidaturas
- [ ] Status badges
- [ ] Oportunidade info
- [ ] Data de aplicação
- [ ] Filtros (status)

**Entrega**: Acompanhador de candidaturas

---

## 🎯 Fase 8: Admin Panel (Semana 9-10)

### 8.1 Admin Dashboard
**Objetivo**: Moderadores/admins gerenciam plataforma

Página `/admin/dashboard`:
- [ ] Estatísticas gerais (users, projects, opportunities)
- [ ] Atividades recentes
- [ ] Users online
- [ ] Issues para resolver

**Entrega**: Dashboard admin

---

### 8.2 Content Moderation
**Objetivo**: Curar conteúdo

Página `/admin/content`:
- [ ] Lista de conteúdo a revisar
- [ ] Status: draft, review, published, archived
- [ ] Approve/reject buttons
- [ ] Flag for review
- [ ] Comment moderation

**Entrega**: Sistema de curação

---

## 🎯 Fase 9: Refinement & Launch (Semana 10-11)

### 9.1 Performance & SEO
- [ ] Lazy loading em imagens
- [ ] Code splitting
- [ ] CSS critical
- [ ] Minificação
- [ ] SEO meta tags
- [ ] Open Graph
- [ ] Sitemap

### 9.2 Testes
- [ ] Unit tests (backend)
- [ ] Integration tests (API)
- [ ] E2E tests (frontend)
- [ ] Acessibilidade audit

### 9.3 Segurança
- [ ] Rate limiting
- [ ] Input validation/sanitization
- [ ] CSRF protection
- [ ] XSS protection
- [ ] SQL injection prevention
- [ ] Password policy

### 9.4 Documentação
- [ ] API docs atualizadas
- [ ] README completo
- [ ] Deployment guide
- [ ] Contributing guide

---

## 📊 Timeline Total

| Fase | Semanas | Status |
|------|---------|--------|
| Fundação | 1-2 | 🔴 |
| Autenticação | 2-3 | 🔴 |
| Dados Públicos | 3-4 | 🔴 |
| Comunidade | 4-5 | 🔴 |
| Social | 5-6 | 🔴 |
| Frontend MVP | 6-8 | 🔴 |
| Dashboard | 8-9 | 🔴 |
| Admin | 9-10 | 🔴 |
| Launch | 10-11 | 🔴 |

**Total: ~11 semanas (~3 meses) com 1-2 desenvolvedores**

---

## ✅ Checklist de Qualidade

Em cada fase, antes de prosseguir:

- [ ] Todos os endpoints testados manualmente
- [ ] Testes unitários com >80% coverage
- [ ] Sem warnings no console
- [ ] Performance metrics OK (FCP, LCP, CLS)
- [ ] Acessibilidade testada (axe, keyboard nav)
- [ ] Documentação atualizada
- [ ] Code reviewed
- [ ] Deployed em staging

---

## 🔄 Fluxo Recomendado

1. **Escolha: MVP Focused ou Full Features?**
   - MVP Focused: Fases 1-6 (6 semanas)
   - Full Stack: Fases 1-9 (11 semanas)

2. **Setup Local**
   - Clone repo
   - `npm install` em frontend e backend
   - Configure `.env` files
   - `npx prisma migrate dev`
   - Start dev servers

3. **Desenvolvimento por Feature**
   - Crie branch: `git checkout -b feat/feature-name`
   - Código backend primeiro
   - Código frontend depois
   - Teste manualmente
   - Abra PR para review

4. **Deploy Workflow**
   - Staging deploy automático em main
   - Manual deploy para production

---

## 💡 Dicas de Desenvolvimento

### Prioritização
Sempre pense: "O usuário consegue completar sua jornada sem isto?"
- Se não → fazer agora
- Se sim → próximo sprint

### Testing First
Escreva testes antes do código:
1. Defina spec
2. Escreva teste (falha)
3. Escreva código (passa)
4. Refatore

### Commit Disciplina
```
feat: adiciona novo sistema
fix: corrige bug em X
docs: atualiza README
style: formata código
refactor: refatora componente
test: adiciona testes
chore: atualiza dependências
```

### Code Review
Sempre pedir review antes de merge. Checklist:
- [ ] Funcionalidade está completa
- [ ] Testes passam
- [ ] Sem console warnings
- [ ] Acessibilidade OK
- [ ] Performance OK
- [ ] Docs atualizadas

---

## 📞 Próximos Passos

Escolha começar pela **Fase 1**? Vou criar:

1. ✅ Setup Prisma completo
2. ✅ Schema com todas as tabelas
3. ✅ Backend boilerplate
4. ✅ Migrations base

**Quer que comece agora?**

---

**ENTRE EM CENA** — Construído por quem acredita no audiovisual.
