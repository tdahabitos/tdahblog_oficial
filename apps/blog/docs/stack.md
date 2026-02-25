# STACK (por evidências do repo)

> Fonte (evidências diretas):
> - `apps/blog/astro.config.mjs`
> - `apps/blog/src/lib/analytics.ts`
> - `apps/blog/src/pages/api/event.ts`
> - listagem de páginas em `apps/blog/src/pages/**`

## 1) Camadas

### Frontend (Web)
- Framework: **Astro**
  - Config: `apps/blog/astro.config.mjs`
  - `output: "server"` (SSR)
- Integrações Astro:
  - `@astrojs/react` (React)
  - `@astrojs/vercel` (adapter Vercel)
  - `@astrojs/sitemap` (sitemap)

### UI / Layout
- Layout base: `apps/blog/src/layouts/BaseLayout.astro`
  - Topbar + dropdown + toggle de tema (client-side)
  - SEO via componente `Head`:
    - `apps/blog/src/components/head.astro` (**NÃO ENCONTRADO** no que foi mostrado, apenas referenciado)

### Backend (API no Astro)
- Rotas API (Astro `src/pages/api/*`):
  - `apps/blog/src/pages/api/event.ts` (recebe eventos)
  - `apps/blog/src/pages/api/comment.ts` (**NÃO ANALISADO** aqui, apenas listado)
  - `apps/blog/src/pages/api/like.ts` (**NÃO ANALISADO** aqui, apenas listado)

### Dados (persistência)
- Banco/serviço: **Supabase** (via `supabaseServer`)
  - Uso: `apps/blog/src/pages/api/event.ts`
  - Implementação: `apps/blog/src/lib/supabase` (**NÃO ENCONTRADO** no que foi colado, apenas importado)

### Deploy / Infra
- Plataforma: **Vercel**
  - Evidência: adapter `@astrojs/vercel` em `apps/blog/astro.config.mjs`
- `vercel.json` / `.vercel/`: **NÃO ENCONTRADO**

---

## 2) Dependências-chave (confirmadas)

- `astro` (implícito pelo config e estrutura)
- `@astrojs/vercel` (SSR na Vercel)
- `@astrojs/react` (suporte a React)
- `@astrojs/sitemap` (geração sitemap)

> Dependências adicionais (package.json do app): **NÃO ENCONTRADO** (não foi colado aqui)

---

## 3) Analytics / Eventos

### Client
- Função de tracking:
  - `apps/blog/src/lib/analytics.ts`
- Envio:
  - `navigator.sendBeacon("/api/event", ...)` (preferencial)
  - fallback `fetch("/api/event", { keepalive: true })`

### Server
- Endpoint:
  - `apps/blog/src/pages/api/event.ts`
- Campos gravados (tabela `events` no Supabase):
  - `event_name`
  - `path`
  - `referrer`
  - `visitor_hash`
  - `payload` (dados adicionais)

> Integrações típicas (GA/GTM/Meta Pixel/Hotjar/Clarity/TikTok): **NÃO ENCONTRADO** (busca não retornou matches)

---

## 4) Variáveis de ambiente (somente nomes)

Confirmadas por evidência direta:
- `VISITOR_SALT` (usada em `apps/blog/src/pages/api/event.ts`)

Prováveis/relacionadas ao Supabase:
- **NÃO ENCONTRADO** (arquivo `src/lib/supabase` não foi exibido, então não dá pra listar nomes com evidência)

---

## 5) Integrações externas

Confirmadas:
- **Supabase** (insert em `events`)
- **Vercel** (adapter)

Outras (Analytics/Tag Manager/Pixel/CRM etc.):
- **NÃO ENCONTRADO**