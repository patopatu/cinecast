# 🔌 Cine Cast — API Documentation

## Visão Geral

API RESTful para a plataforma Cine Cast.

## Base URL

```
https://api.cinecast.com.br/v1
```

## Autenticação

Todos os endpoints (exceto login/registro) requerem autenticação via JWT.

```
Authorization: Bearer <token>
```

## Endpoints Principais

### Autenticação

#### POST /auth/register
Registrar novo usuário

```json
{
  "email": "user@example.com",
  "password": "secure_password",
  "username": "username",
  "full_name": "Full Name"
}
```

#### POST /auth/login
Fazer login

```json
{
  "email": "user@example.com",
  "password": "password"
}
```

### Usuários

#### GET /users/me
Obter dados do usuário autenticado

#### PATCH /users/me
Atualizar perfil

#### GET /users/{username}
Obter dados públicos de um usuário

### Projetos

#### GET /projects
Listar projetos com filtros

**Query Parameters**:
- `page`: Número da página
- `limit`: Itens por página
- `type`: Tipo de projeto
- `status`: Status do projeto
- `sort`: Campo para ordenação

#### POST /projects
Criar novo projeto

```json
{
  "title": "Project Title",
  "description": "Project description",
  "type": "short_film"
}
```

#### GET /projects/{slug}
Obter detalhes de um projeto

#### PATCH /projects/{slug}
Atualizar projeto

#### DELETE /projects/{slug}
Deletar projeto

### Oportunidades

#### GET /opportunities
Listar oportunidades com filtros

#### POST /opportunities
Criar nova oportunidade

#### GET /opportunities/{slug}
Obter oportunidade

#### PATCH /opportunities/{slug}
Atualizar oportunidade

#### POST /opportunities/{slug}/applications
Submeter candidatura

### Conteúdo

#### GET /content
Listar conteúdo

#### POST /content
Criar novo conteúdo

#### GET /content/{slug}
Obter conteúdo

#### PATCH /content/{slug}
Atualizar conteúdo

### Recursos

#### GET /resources
Listar recursos

#### POST /resources
Criar novo recurso

#### GET /resources/{slug}
Obter recurso

## Status Codes

- `200 OK` — Sucesso
- `201 Created` — Recurso criado
- `204 No Content` — Deletado com sucesso
- `400 Bad Request` — Validação falhou
- `401 Unauthorized` — Sem autenticação
- `403 Forbidden` — Sem permissão
- `404 Not Found` — Recurso não encontrado
- `500 Internal Server Error` — Erro no servidor

---

**ENTRE EM CENA** — Construído por quem acredita no audiovisual.