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
# docs/runbook-deploy.md

# RUNBOOK de Deploy (Astro SSR na Vercel)

> Fonte (evidências diretas):
> - `apps/blog/astro.config.mjs` (SSR + adapter Vercel + sitemap)
> - `apps/blog/src/pages/api/event.ts` (API route + Supabase)
> - `apps/blog/src/lib/analytics.ts` (client tracking)
>
> Onde não houver evidência no repo apresentado, está marcado como **NÃO ENCONTRADO**.

---

## 1) Pré-requisitos

- Node.js: **NÃO ENCONTRADO** (versão não foi localizada aqui)
- Package manager: **NÃO ENCONTRADO** (pnpm/yarn/npm não foi confirmado aqui)
- Projeto Astro SSR:
  - `apps/blog/astro.config.mjs` com `output: "server"` e `adapter: vercel()`

---

## 2) Variáveis de ambiente (Deploy)

Obrigatórias (confirmadas):
- `VISITOR_SALT`

Supabase (necessárias para `supabaseServer`, mas sem nomes confirmados):
- **NÃO ENCONTRADO** (arquivo `src/lib/supabase` não foi mostrado)

> Ação prática: abrir `apps/blog/src/lib/supabase.*` e listar as env vars usadas ali.

---

## 3) Passo a passo de deploy

### A) Local (build de verificação)
1. Instalar dependências (comando exato): **NÃO ENCONTRADO**
2. Build:
   - comando exato: **NÃO ENCONTRADO**
3. Rodar local:
   - Observação importante (já visto antes no seu log):
   - `astro preview` pode falhar com adapter da Vercel (o adapter não suporta preview).
   - Alternativas usuais: `astro dev` ou rodar via `vercel dev` (**comandos exatos: NÃO ENCONTRADO**)

### B) Git push
1. Commit das alterações
2. Push para o branch que a Vercel está configurada pra deploy
   - branch/pipeline: **NÃO ENCONTRADO**

### C) Vercel Deploy
1. Vercel detecta o projeto
2. Build e deploy
   - Build settings (framework preset, build command, output dir): **NÃO ENCONTRADO**
   - `vercel.json`: **NÃO ENCONTRADO**

---

## 4) Validações pós-deploy

### A) Site e SSR
- Abrir páginas principais:
  - `/` (home)
  - `/comece-aqui`
  - `/diagnostico`, `/regulacao`, `/estrategias`, `/ciencia`, `/recursos`
- Conferir se navegação do header funciona e dropdown abre/fecha

### B) Sitemap
- Integração `@astrojs/sitemap` está ativa em `apps/blog/astro.config.mjs`
- Validar:
  - `https://tdah.blog/sitemap-index.xml` ou `https://tdah.blog/sitemap.xml`
  - (endpoint exato gerado pelo plugin depende da config; aqui está **NÃO CONFIRMADO**)

### C) Analytics (evento)
1. Abrir o site e disparar um evento manual (ou via console):
   - `track("page_view")` (**uso não encontrado em páginas; apenas função existe**)
2. Verificar se a rota responde:
   - POST `https://tdah.blog/api/event`
3. Confirmar inserção no Supabase:
   - tabela `events` (nome confirmado por `supabaseServer.from("events")`)

---

## 5) Troubleshooting

### Problema: `astro preview` falha com adapter Vercel
- Sintoma:
  - Erro indicando que o adapter da Vercel não suporta `preview`
- Causa:
  - Projeto está em SSR com `@astrojs/vercel`
- Ação:
  - Usar `astro dev` para desenvolvimento local (**comando exato: NÃO ENCONTRADO**)
  - Ou `vercel dev` (se for seu fluxo) (**NÃO ENCONTRADO**)

### Problema: Eventos não chegam no Supabase
Checklist:
- A rota existe:
  - `apps/blog/src/pages/api/event.ts`
- Payload inválido:
  - `event_name` vazio retorna `204`
- Env `VISITOR_SALT` ausente:
  - ainda funciona (fallback `"salt"`), mas perde robustez
- Supabase falha:
  - causas comuns: credenciais/env, rede, policy/RLS, tabela inexistente
  - env vars do Supabase: **NÃO ENCONTRADO**
  - schema/migrations: **NÃO ENCONTRADO**

### Problema: Erros 500 na rota `/api/event`
- Ver logs da Vercel (Functions)
- Confirmar se `supabaseServer` está acessível no ambiente server
- Verificar se `import.meta.env.*` está configurado no deploy

---

## 6) Checklist mensal (SEO, analytics, dependências, erros comuns)

### SEO
- Sitemap gerando e acessível (`@astrojs/sitemap`):
  - conferir endpoint do sitemap em produção
- Robots:
  - `public/robots.txt`: **NÃO ENCONTRADO**
- Search Console:
  - configuração: **NÃO ENCONTRADO** (processo externo, não no repo)
- Verificar títulos/OG:
  - `BaseLayout.astro` usa `Head` com `canonical`, `ogImage`, `ogType`, `noindex`

### Analytics / Eventos
- Conferir volume e sanidade de eventos no Supabase:
  - tabela `events` recebendo `event_name`, `path`, `referrer`, `visitor_hash`
- Garantir que a rota `/api/event` não está sendo bloqueada por cache/CDN

### Dependências
- Rodar atualização de dependências: **NÃO ENCONTRADO** (comandos e policy)
- Conferir mudanças do Astro/adapter Vercel antes de atualizar

### Erros comuns (recorrentes)
- `astro preview` incompatível com adapter Vercel (SSR)
- Falta/erro de env vars do Supabase (nomes não confirmados aqui)
- Tabela `events` inexistente ou RLS bloqueando inserts (schema não confirmado)

---

## 7) Itens pendentes para fechar 100% com evidência

Para completar este runbook com precisão absoluta do repo, falta colar/analisar:
- `apps/blog/package.json` (scripts + deps)
- `apps/blog/src/lib/supabase.*` (env vars e client/server)
- qualquer `supabase/migrations/*.sql` (tabela `events`, policies/RLS)
- `vercel.json` (se existir) e settings de build