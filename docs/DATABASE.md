# 🗄️ Cine Cast — Database Schema

## Visão Geral

Banco de dados PostgreSQL com estrutura relacional para suportar:
- Usuários (perfis, autenticação)
- Projetos (produções, equipes)
- Oportunidades (chamadas, casting)
- Conteúdo (blog, recursos, perguntas)
- Comunidade (interações, contribuições)

## Tabelas Principais

### Users (Usuários)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  bio TEXT,
  avatar_url VARCHAR(500),
  role ENUM('user', 'producer', 'admin') DEFAULT 'user',
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  location VARCHAR(255),
  portfolio_url VARCHAR(500),
  social_links JSONB,
  preferences JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

### Projects (Projetos/Produções)

```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  creator_id UUID NOT NULL REFERENCES users(id),
  project_type ENUM('short_film', 'feature', 'documentary', 'animation', 'series', 'podcast', 'videoclip', 'webinar', 'other'),
  genre VARCHAR(100),
  status ENUM('idea', 'development', 'preproduction', 'production', 'postproduction', 'finished', 'archived') DEFAULT 'idea',
  target_audience VARCHAR(255),
  budget_range VARCHAR(50),
  location VARCHAR(255),
  cover_image_url VARCHAR(500),
  team_size_target INTEGER,
  is_open_for_collaboration BOOLEAN DEFAULT true,
  visibility ENUM('public', 'private', 'restricted') DEFAULT 'public',
  views_count INTEGER DEFAULT 0,
  saved_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP
);
```

### Opportunities (Oportunidades/Chamadas)

```sql
CREATE TABLE opportunities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  project_id UUID REFERENCES projects(id),
  creator_id UUID NOT NULL REFERENCES users(id),
  opportunity_type ENUM('casting', 'crew', 'internship', 'collaboration', 'mentorship', 'other'),
  location VARCHAR(255),
  is_remote BOOLEAN DEFAULT false,
  is_paid BOOLEAN DEFAULT false,
  compensation VARCHAR(255),
  deadline DATE NOT NULL,
  status ENUM('draft', 'published', 'closed', 'filled') DEFAULT 'draft',
  applications_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Content (Blog/Conteúdo)

```sql
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  content_type ENUM('article', 'tip', 'experience', 'process', 'question'),
  author_id UUID NOT NULL REFERENCES users(id),
  tags TEXT[],
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Resources (Modelos/Documentos)

```sql
CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  resource_type ENUM('template', 'checklist', 'guide', 'tool', 'document'),
  file_url VARCHAR(500),
  version VARCHAR(20) DEFAULT '1.0',
  author_id UUID NOT NULL REFERENCES users(id),
  status ENUM('draft', 'published', 'update_needed', 'archived') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Relacionamentos

```
Users
  ├─ Projects (1:N) - como creator
  ├─ Opportunities (1:N) - como creator
  ├─ Content (1:N) - como author
  ├─ Resources (1:N) - como author
  └─ Saved Items (1:N)

Projects
  ├─ Opportunities (1:N)
  └─ Team Members (1:N)

Opportunities
  └─ Applications (1:N)

Content
  └─ Comments (1:N)
```

---

**ENTRE EM CENA** — Construído por quem acredita no audiovisual.