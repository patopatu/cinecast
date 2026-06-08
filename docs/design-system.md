# CineCast — Design System

> **Fonte oficial de identidade visual** do projeto CineCast.
> Este documento define a linguagem visual — paleta, tipografia, espaçamento, componentes, princípios.
> **Toda decisão de design no produto deve passar por aqui.**

Inspiração: **Letterboxd, Linear, Vimeo, Apple, Arc Browser.**

---

## 🎯 Princípios

1. **Cinematográfico ≠ escuro.** É sobre contraste dramático, escala tipográfica agressiva e respiro generoso.
2. **Cada produção é um filme.** Cards com pôster vertical (2:3), tipografia de crédito, badges sutis.
3. **Navegação silenciosa.** A navbar nunca compete com o conteúdo.
4. **Primeira dobra vende.** Hero forte, acima do fold.
5. **Mobile-first.** O site precisa parecer excelente em 375px.

**Restrição de paleta:** preto cinematográfico + azul profundo + azul elétrico + neutros sofisticados. **Sem roxo, sem rosa, sem neon gamer.**

---

## 🎨 Paleta

### Cores base

| Token | Hex | Uso |
|---|---|---|
| `--color-deep-black` | `#050505` | Background principal, "preto de cinema" |
| `--color-night-blue` | `#07111F` | Azuis profundos, gradientes, banners |
| `--color-electric` | `#008CFF` | Acento primário, CTAs, links ativos |
| `--color-electric-soft` | `#42A5FF` | Hover do electric, gradient text |
| `--color-cream` | `#F6F2E8` | Texto principal, detalhes de marca |
| `--color-gold` | `#D6A84B` | Destaque de "premiado", "remunerada" |

### Aliases semânticos

| Token | Valor | Uso |
|---|---|---|
| `--color-background` | `#050505` | `bg-background` — body |
| `--color-card` | `#0d1521` | `bg-card` — superfícies elevadas |
| `--color-surface-2` | `#14202f` | Camada acima de card |
| `--color-primary` | `#008CFF` | `text-primary`, `bg-primary` |
| `--color-primary-hover` | `#42A5FF` | Hover |
| `--color-foreground` | `#F6F2E8` | Texto principal |
| `--color-muted` | `#8a96a8` | Texto secundário, labels |
| `--color-border` | `rgba(255,255,255,0.06)` | Bordas sutis |
| `--color-border-strong` | `rgba(255,255,255,0.12)` | Bordas em hover |
| `--color-success` | `#10b981` | Status "aberta", confirmações |
| `--color-danger` | `#ef4444` | Erros, "remover" |
| `--color-warning` | `#D6A84B` | Avisos (mesmo do gold) |

### Gradientes cinematográficos

| Classe | Uso |
|---|---|
| `.gradient-cinema` | Vertical deep-black → night-blue (cards, seções neutras) |
| `.gradient-hero` | Radial com glow azul + linear deep-black (hero) |
| `.gradient-vignette` | Vinheta nas bordas (overlay decorativo) |
| `.gradient-fade-bottom` | Fade transparente → preto (rodapé de banner) |
| `.gradient-fade-top` | Fade preto → transparente (transição entre seções) |

### Texto com gradiente

```html
<span class="text-gradient italic">Em um só lugar.</span>
```
Resultado: gradient de cream → electric-soft. Usar com moderação (frases curtas, ênfase).

---

## 🔤 Tipografia

### Famílias

| Token | Família | Uso |
|---|---|---|
| `--font-display` | **Fraunces** (serifa) | Títulos H1–H3, hero, nome de produção, branding |
| `--font-sans` | **Geist** | UI, body, labels, números |

Aplicar via `class="font-display"` (serifa) ou `class="font-sans"` (UI, padrão).

### Escala

| Token | Tamanho | Classe | Uso |
|---|---|---|---|
| `--text-display` | 72px (sm 80 / md 96 / lg 128) | `.text-display` + `text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem]` | H1 do hero |
| `--text-h1` | 48px | `.text-h1` + `text-4xl sm:text-5xl` | H1 de seções |
| `--text-h2` | 30px | `.text-h2` | Subtítulos de seção |
| `--text-h3` | 20px | `.text-h3` | Títulos de cards |
| `--text-body` | 16px | (default) | Parágrafos |
| `--text-sm` | 14px | `text-sm` | UI secundária |
| `--text-xs` | 12px | `text-xs` | Eyebrows, labels pequenas |

### Eyebrow

```html
<span class="text-eyebrow">Catálogo</span>           <!-- color: electric -->
<span class="text-eyebrow-muted">Em produção</span>  <!-- color: muted -->
```

- 12px, weight 500, uppercase, tracking `0.25em`.

### Pesos da Fraunces

- 400 (regular) — H1 e H2 do hero. A serifa já é forte.
- 500 (medium) — H3, títulos de cards, sinopse.
- 600 (semibold) — uso raro, ênfase forte.

### Pesos da Geist

- 400 (regular) — body, parágrafos.
- 500 (medium) — labels, navegação, botões.

---

## 📏 Espaçamento

Escala 4/8/12/16/24/32/48/64/96/128 (sempre múltiplos de 4).

| Contexto | Mobile | Desktop |
|---|---|---|
| Section principal (vertical) | `py-12` (48px) | `py-20 md:py-28` (80/112px) |
| Hero principal | `py-20` | `pb-32 pt-28 md:pb-40 md:pt-36` |
| Cards internos | `p-5` | `p-6` |
| Container de produção (largura) | `max-w-7xl px-4` | `sm:px-6 lg:px-8` |
| Gap entre cards | `gap-5` | `sm:gap-6` |
| Gap entre seções | `space-y-12` | `space-y-12` ou `mb-12 md:mb-16` |

**Regra:** se parece apertado, dobre o espaço.

---

## 🔘 Componentes

### Botões

```html
<a class="btn-primary">Explorar produções →</a>
<a class="btn-secondary">Criar conta</a>
<a class="btn-ghost">Saiba mais</a>
```

- **Primário:** pill `rounded-full`, `bg-electric text-deep-black`. Hover: `bg-electric-soft` + active scale 0.98.
- **Secundário:** pill com `border-white/15 bg-transparent`. Hover: `bg-white/5`.
- **Ghost:** sem fundo, texto muted, hover foreground.

**Sempre usar pills** (border-radius total), nunca retângulos com `rounded-md` em CTAs.

### Cards

- `rounded-xl` (12px) ou `rounded-2xl` (16px) — nunca `rounded-3xl` em cards de produção.
- Borda sutil `border-white/5`, hover `border-white/15`.
- Padding interno generoso (`p-5` a `p-7`).
- Sombra: `shadow-2xl shadow-black/60` em dropdowns/modais, `shadow-md` em cards.

### Inputs

```html
<input class="w-full rounded-2xl border border-white/10 bg-card py-4 px-4
              text-base text-foreground placeholder:text-muted
              outline-none focus:border-electric" />
```

- `rounded-2xl` em inputs de busca/destaque.
- `rounded-lg` em inputs de formulário.
- Sempre `placeholder:text-muted`.

### Badges

```html
<span class="rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider">
  <!-- variants: -->
  bg-electric/15 text-electric
  bg-success/15 text-success
  bg-gold/15 text-gold
  bg-white/5 text-muted
</span>
```

### Eyebrow com dot

```html
<div class="flex items-center gap-3">
  <span class="status-dot bg-electric shadow-[0_0_12px_var(--color-electric)]" />
  <span class="text-eyebrow">Plataforma brasileira de audiovisual</span>
</div>
```

---

## 🎬 Hierarquia visual

### Tamanhos relativos (regra de ouro)

| Nível | Tamanho relativo ao anterior |
|---|---|
| Eyebrow | 12px |
| Body | 16px (1.3× eyebrow) |
| H3 | 20px (1.25× body) |
| H2 | 30px (1.5× H3) |
| H1 de seção | 48px (1.6× H2) |
| H1 de hero | 80–128px (1.7–2.7× H1) |

**A diferença entre H1 de seção e H1 de hero deve ser gritante** — não podem ter o mesmo `text-3xl`.

### Cores por hierarquia

- **Primário:** `text-foreground` (cream) — títulos, conteúdo principal.
- **Secundário:** `text-muted` — subtítulos, descrições, labels.
- **Acento:** `text-electric` — CTAs, links, "premiado".
- **Decorativo:** `text-gold` — badges especiais, "remunerada".

**Nunca** `text-foreground` em tudo. **Nunca** 3 cores primárias competindo na mesma área.

---

## 📱 Responsividade

### Breakpoints

| Prefix | Largura mínima | Uso |
|---|---|---|
| (default) | 0px | Mobile-first |
| `sm:` | 640px | Tablet pequeno |
| `md:` | 768px | Tablet grande |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Desktop grande (cards 4 colunas) |

### Padrões por breakpoint

| Elemento | Mobile | Desktop |
|---|---|---|
| Grid de cards | 1 coluna | `sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4` |
| Navbar | hambúrguer | `hidden md:flex` com links centrais |
| Hero H1 | `text-5xl` | `sm:text-6xl md:text-7xl lg:text-[6.5rem]` |
| Container | `px-4` | `sm:px-6 lg:px-8` |
| Section padding | `py-12` | `py-20 md:py-28` |

---

## 🎯 Estados

### Loading

- Skeletons com `bg-white/5 animate-pulse`.
- Nunca spinners genéricos.
- Para auth, mostrar placeholder com mesma altura do componente final (evita layout shift).

### Vazio (empty state)

- Sempre convite caloroso, nunca "nada aqui".
- Estrutura: ícone SVG simples + headline em serifa + descrição + CTA.
- Exemplo: "Nenhuma produção publicada ainda" + "Seja o primeiro a abrir uma chamada."

### Erro

- Vermelho discreto (`bg-danger/10 text-danger`), nunca `bg-red-500/10 text-red-400` hardcoded.

---

## ♿ Acessibilidade

- **Focus visível global:** `*:focus-visible { outline: 2px solid var(--color-electric); outline-offset: 3px; }`
- **Contraste mínimo:** texto `text-muted` sobre `bg-background` deve passar 4.5:1 (AA). Cream sobre deep-black passa AAA.
- **Aria labels** em todos os botões só com ícone.
- **Modal:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby` apontando para o título, fechar com `Esc`.
- **Inputs:** sempre com `<label>` associado via `htmlFor` ou wrapping.

---

## 📐 Tokens de sombra

| Token | Valor | Uso |
|---|---|---|
| `--shadow-cinema-sm` | `0 2px 8px rgba(0,0,0,0.4)` | Cards em repouso |
| `--shadow-cinema-md` | `0 8px 24px rgba(0,0,0,0.5)` | Cards elevados |
| `--shadow-cinema-lg` | `0 24px 60px rgba(0,0,0,0.6)` | Modais, dropdowns |
| `--shadow-cinema-glow` | com matiz electric | Hover de cards em destaque |

---

## 🚫 O que NÃO fazer

- ❌ Cores roxas, rosa, magenta, neon gamer.
- ❌ `rounded-md` em CTAs (sempre pills).
- ❌ Cantos arredondados exagerados (`rounded-3xl`) em cards.
- ❌ Texto 100% `text-foreground` (sem hierarquia).
- ❌ Cards com fundo claro sobre fundo escuro.
- ❌ Modal como destino principal de navegação.
- ❌ Spinner genérico como loading.
- ❌ Imagens `<img>` cruas em produção (usar `next/image`).
- ❌ Emojis decorativos (📍 etc.) em elementos críticos — preferir SVG inline.
- ❌ `bg-red-500/10 text-red-400` hardcoded — usar tokens.

---

## 📚 Referências

- [Letterboxd](https://letterboxd.com) — pôster vertical, tipografia de crédito.
- [Linear](https://linear.app) — navbar blur, precisão, micro-animações.
- [Vimeo](https://vimeo.com) — hero cinematográfico, foco em vídeo.
- [Apple](https://apple.com) — escala tipográfica, hierarquia por tamanho.
- [Arc Browser](https://arc.net) — gradientes sofisticados, glass morphism.
