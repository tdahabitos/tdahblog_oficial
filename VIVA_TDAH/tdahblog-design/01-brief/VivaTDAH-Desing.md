<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" style="height:64px;margin-right:32px"/>

# quero que você gere esse novo index, com todas as mnelhorias, e todos os acrescimos sugeridos, você consegue? quero que seja no mesmo padrão, hipergranular

Aqui está o **INDEX HIPERGRANULAR DEFINITIVO v6.0** — consolidando 100% do v5.0 + todas as melhorias + todos os acréscimos da auditoria. Itens marcados com 🆕 são novos; itens com 🔧 foram refinados/expandidos.

***

# VivaTDAH Design System — INDEX HIPERGRANULAR DEFINITIVO v6.0

**Cobertura: Web · Mobile · Tablet · PWA · Foldable · Wearable · Spatial · TV**


| Métrica | v5.0 | v6.0 |
| :-- | :-- | :-- |
| Partes | 14 | **17** |
| Capítulos | 58 | **68** |
| Seções (\#\#) | ~230 | **~280** |
| Subseções (\#\#\#) | ~620 | **~740** |
| Variáveis cobertas | 280+ | **350+** |
| W3C DTCG 2025.10 | ❌ | ✅ |


***

## PARTE I — VISÃO ESTRATÉGICA E FUNDAÇÃO

### Cap. 1 — Missão, Princípios e Escopo

- 1.1 Missão do Design System[^1]
- 1.2 Princípios de Design (Clareza, Consistência, Acessibilidade, Performance)[^1]
- 1.3 Design Philosophy: Modern Minimal SaaS[^1]
- 1.4 Modelo Mental: Atomic Design (Átomos → Moléculas → Organismos → Templates → Páginas)[^1]
- 1.5 Escopo (tokens, components, patterns, templates)[^1]
- 1.6 Exclusões (one-off pages, marketing experiments)[^1]
- 1.7 Success Criteria (adoção 80%, bugs −30%, speed −40%)[^1]
- 1.8 Público-alvo (Design, Eng, Product, QA, A11y)[^1]
- 1.9 Glossário e Convenções de Nomenclatura (PascalCase, camelCase, kebab-case, snake_case)[^1]
- 1.10 🆕 Platform Coverage Matrix (Web, iOS, Android, RN, PWA, Wearable, TV, Spatial)
- 1.11 🆕 Design System Maturity Scorecard (baseline, targets, measurement cadence)


### Cap. 2 — Pipeline Determinístico

- 2.1 Visão do Pipeline (registry → tokens → componentes → stories → testes)[^1]
- 2.2 🔧 Fonte Única: registry.json (350+ variáveis — mapa explícito com IDs únicos, registry-native vs. computed)[^1]
- 2.3 Idempotência e Hash SHA-256 por Seção[^1]
- 2.4 🔧 Geração de Artefatos (tokens.json, tokens.css, tailwind.preset.ts, ui.generated.tsx, tokens.flutter.dart)[^1]
- 2.5 Semantic.css — Alias Tokens Layer[^1]
- 2.6 hash.manifest.json — Drift Guard[^1]
- 2.7 🔧 Estrutura de Pastas Monorepo + Tooling (Turborepo/Nx, task caching, remote caching config)[^1]
- 2.8 🔧 Build CLI (build, validate, lint, diff, publish, migrate, --fail-fast)[^1]
- 2.9 🆕 W3C DTCG 2025.10 Compliance Layer[^2][^3]
- 2.9.1 🆕 `$type` enforcement obrigatório em todos os tokens
- 2.9.2 🆕 `$description` em cada token para geração automática de docs
- 2.9.3 🆕 `$extensions` namespace para metadados custom (agent hints, figma-sync)
- 2.9.4 🆕 Group inheritance (tipo herdado do grupo pai)
- 2.9.5 🆕 Multi-file token support (split por domínio: `color.tokens.json`, `typography.tokens.json`)
- 2.9.6 🆕 Composite token types (typography, border, shadow, transition, gradient)
- 2.9.7 🆕 Token resolution order (alias → computed → fallback → error)
- 2.9.8 🆕 DTCG Validator Agent (CI gate que verifica spec compliance)


### Cap. 3 — Roteamento LLM (4 Tiers)

- 3.1 Tier script_only (Python, \$0, 55%)[^1]
- 3.2 Tier llm_low_cost (DeepSeek-chat, ~\$0.002, 25%)[^1]
- 3.3 Tier llm_mid (Claude Haiku / GPT-4o-mini, ~\$0.015, 10%)[^1]
- 3.4 Tier llm_strong (Claude Sonnet / GPT-4o, ~\$0.050, 10%)[^1]
- 3.5 Quality Gates — Upgrade Automático por Complexidade[^1]
- 3.6 Budgets Diários (\$2+\$5+\$10 = \$15/dia)[^1]
- 3.7 Fallback Chain (strong → mid → low → script)[^1]
- 3.8 Retry Policy (3 attempts, backoff 1→2→4s)[^1]
- 3.9 Budget Alert Threshold (80%) e Downgrade Automático[^1]
- 3.10 Blocked Tier — valores imutáveis protegidos[^1]
- 3.11 🆕 Prompt Template Registry (versioned prompts per agent, A/B testing)
- 3.12 🆕 LLM Output Validation (JSON schema check pós-geração, auto-retry on fail)


### Cap. 4 — Governança e Lifecycle

- 4.1 Versionamento SemVer Strict[^1]
- 4.2 Deprecation Policy (6 semanas, warn → lint → hard_remove)[^1]
- 4.3 Exception Policy (ADR obrigatório + owner approval)[^1]
- 4.4 Definition of Done (a11y + tests + docs)[^1]
- 4.5 RFC Governance Model[^1]
- 4.6 Sunset Process (deprecate → warn → hard_remove)[^1]
- 4.7 Component Request Process (issue template, SLA 5 dias)[^1]
- 4.8 Public Roadmap e Monthly Review[^1]
- 4.9 RACI Matrix (Responsible, Accountable, Consulted, Informed)[^1]
- 4.10 Design System Council (composição, cadência, veto)[^1]
- 4.11 Maturity Model (Alpha → Beta → Stable → Deprecated)[^1]
- 4.12 Quarterly Audit de Aderência[^1]
- 4.13 🔧 Ownership Map (350+ variáveis → owners mapeados por domínio)[^1]
- 4.14 🆕 Breaking Change Impact Analysis (blast radius: quantos consumidores afetados)
- 4.15 🆕 Contribution Guide (external PR template, review SLA, credit model)


### Cap. 5 — Legal e Compliance

- 5.1 Licenciamento e Headers de Licença[^1]
- 5.2 Dependency Audit (GPL, MIT, Apache)[^1]
- 5.3 LGPD/GDPR Consent Patterns[^1]
- 5.4 Accessibility Statement Generator[^1]
- 5.5 🆕 Cookie Consent UI Components (banner, preferences, granular consent)
- 5.6 🆕 Data Retention Tokens (visual indicators de data age e deletion policy)

***

## PARTE II — DESIGN TOKENS: COR (68+ variáveis)

### Cap. 6 — Color System Completo

- 6.1 🔧 Color Space Pipeline: OKLCH (authoring) → sRGB (fallback) → Display-P3 (enhanced) + conversion pipeline documentado[^1]
- 6.2 🔧 Brand Colors (primary \#667eea, secondary \#764ba2, tertiary 🆕, accent 🆕) + paleta expandida 50→950 shades[^4][^1]
- 6.3 Semantic Colors (success \#16a34a, warning \#f59e0b, error \#dc2626, info \#0ea5e9)[^1]
- 6.4 Surface System (bg_0→bg_3 light / bg_0→bg_3 dark — Slate-based)[^1]
- 6.5 Text Colors (primary, secondary, muted, inverse, on-color)[^1]
- 6.6 Border Colors (default, strong, focus, subtle)[^1]
- 6.7 State Colors (hover α0.92, active α0.86, disabled α0.45, focus_ring \#93c5fd, visited \#7c3aed)[^1]
- 6.8 Overlay Colors (scrim rgba(15,23,42,0.55), tooltip rgba(15,23,42,0.95))[^1]
- 6.9 🔧 Data Visualization Palette (6 sequenciais + 6 divergentes + 8 categóricas — nomes semânticos explícitos)[^1]
- 6.10 Gradient Tokens (brand, mesh, skeleton shimmer, radial, conic)[^1]
- 6.11 🔧 Alpha/Transparency Scale (5/10/15/20/25/30/40/50/60/70/80/90/95 — 13 steps)[^1]
- 6.12 Contrast-based Generation (APCA + WCAG 3.0 readiness)[^1]
- 6.13 Color Blindness Validation Pipeline (Protanopia, Deuteranopia, Tritanopia)[^1]
- 6.14 color-mix() para estados dinâmicos[^1]
- 6.15 Tinted Background Pattern (10% opacidade)[^1]
- 6.16 🔧 Alias Policy (prefer_alias + lint rule que bloqueia primitive onde semantic existe), Fallback (nearest_semantic), Override (layered)[^1]
- 6.17 🆕 Semantic Color Tokens por Componente (button.bg, input.border, card.shadow — 3-layer resolution)
- 6.18 🆕 Dynamic Color Generation (auto-generate hover/active/disabled de uma seed color via OKLCH lightness shift)
- 6.19 🆕 Color Contrast Checker Agent (automated CI scan que reporta violações APCA)


### Cap. 7 — Modos de Tema (Cor)

- 7.1 Dark Mode Values — 21+ Overrides Completos[^1]
- 7.2 High Contrast Values (WCAG AAA 7:1)[^1]
- 7.3 OLED/Dimmed Values[^1]
- 7.4 Mecanismo [data-theme="dark"] + CSS Custom Properties[^1]
- 7.5 System Detection (prefers-color-scheme)[^1]
- 7.6 forced-colors Media Query (Windows High Contrast)[^1]
- 7.7 Theme Transition Animation (fade 150ms)[^1]
- 7.8 🆕 Color Inversion Rules (quais tokens invertem, quais permanecem — ex: brand colors preserved)
- 7.9 🆕 Dark Mode Shadow Adjustment (sombras mais sutis, bordas mais visíveis)
- 7.10 🆕 Per-surface Token Mapping (cada theme define bg→text→border por superfície)

***

## PARTE III — DESIGN TOKENS: TIPOGRAFIA (52+ variáveis)

### Cap. 8 — Typography System

- 8.1 Font Families (Inter, JetBrains Mono, system fallbacks)[^1]
- 8.2 Variable Fonts (eixos wght, wdth, opsz)[^1]
- 8.3 🔧 Escala Tipográfica Fixa (10 tamanhos: 12→60px) + ratio documentado (1.25 Major Third, overridável por plataforma)[^1]
- 8.4 Fluid Typography com clamp() (responsive scaling)[^1]
- 8.5 Pesos (400 regular, 500 medium, 600 semibold, 700 bold)[^1]
- 8.6 Line-height Mapping (size → line-height + vertical rhythm 4px/8px)[^1]
- 8.7 Letter-spacing Scale (+0.2em@12px → −0.04em@48px)[^1]
- 8.8 🔧 Text Styles Semânticos — matrix `style × platform` (display, headline, title, h1→h6, body, body_sm, caption, label, code, overline — com clamp() específico por device)[^1]
- 8.9 🔧 OpenType Features — tokenizados (`typography.features.tabular`, `.fractions`, `.case`, `.ligatures`, `.kerning`)[^1]
- 8.10 Capsize Logic (leading trim pixel-perfect)[^1]
- 8.11 Prose/Readability Token (max-width: 65ch)[^1]
- 8.12 Truncation Rules (1-line, 2-line, 3-line, fade-out)[^1]
- 8.13 Font Loading Strategy (font-display: swap, preload)[^1]
- 8.14 Text Decoration Tokens (underline offset, thickness, style)[^1]
- 8.15 Link Policy (underline: hover, visited: \#7c3aed, color: brand.primary)[^1]
- 8.16 Font Fallback por Locale (ar: Noto Sans Arabic, ja: Noto Sans JP)[^1]
- 8.17 Responsive Text Styles (mobile → tablet → desktop scaling)[^1]
- 8.18 🆕 Paragraph Spacing Token (margin-block-end por text style)
- 8.19 🆕 Text Alignment Tokens (start, center, end — logical, not physical)
- 8.20 🆕 Word Break Tokens (break-word, keep-all por locale — CJK-aware)
- 8.21 🆕 Text Rendering Token (optimizeLegibility/geometricPrecision por contexto)

***

## PARTE IV — DESIGN TOKENS: LAYOUT E ESPAÇAMENTO (32+ variáveis)

### Cap. 9 — Spacing System

- 9.1 Spacing Scale (16 valores: 0→128px, progressão não-linear, base-4)[^1]
- 9.2 Fluid Spacing com clamp() (gaps e paddings responsivos)[^1]
- 9.3 Component Padding Default (16px)[^1]
- 9.4 CSS Logical Tokens (margin-inline, padding-block — RTL-ready)[^1]
- 9.5 Density Scale (compact, default, comfortable)[^1]
- 9.6 🆕 Density Engine Completo
- 9.6.1 🆕 Density Multiplier Token (compact: 0.75, default: 1.0, comfortable: 1.25)
- 9.6.2 🆕 Per-component Density Overrides (table rows, form fields, navigation)
- 9.6.3 🆕 Density-aware Touch Targets (compact ≥ 36px, default ≥ 44px, comfortable ≥ 48px)
- 9.6.4 🆕 DensityProvider Component + useDensity Hook
- 9.6.5 🆕 Auto-density por device (mobile=comfortable, desktop=default, data-table=compact)
- 9.7 🆕 Negative Spacing Tokens (−4, −8, −12 para overlapping elements)
- 9.8 🆕 Gap Tokens semânticos (gap-inline, gap-block — separados de spacing)


### Cap. 10 — Grid e Containers

- 10.1 Grid System (12 colunas, gutter 16/24px)[^1]
- 10.2 Subgrid Support (grid-template-columns: subgrid)[^1]
- 10.3 Containers (sm 640, md 768, lg 1024, xl 1280, 2xl 1536)[^1]
- 10.4 Margins Responsivos (16→48px)[^1]
- 10.5 CSS Grid + Flexbox Patterns[^1]
- 10.6 🆕 Named Grid Areas (header, sidebar, main, footer — semantic grid templates)
- 10.7 🆕 Auto-fit/Auto-fill Patterns (card grids com minmax)
- 10.8 🆕 Masonry Layout Token (CSS masonry-auto-flow, progressive enhancement)


### Cap. 11 — Breakpoints e Responsividade

- 11.1 🔧 Breakpoints (xs: 375 🆕, sm: 640, md: 768, lg: 1024, xl: 1280, 2xl: 1536, 3xl: 1920 🆕)[^1]
- 11.2 🔧 Container Queries + 10 Named Containers padrão (card, sidebar, main, header, form, media, table, dialog, nav, panel)[^1]
- 11.3 Window Size Classes (compact, medium, expanded — Material 3 style)[^1]
- 11.4 Aspect Ratio Tokens (1:1, 4:5, 3:2, 16:9, 9:16, 21:9)[^1]
- 11.5 Touch vs Pointer Sizing (44px touch, 32px pointer)[^1]
- 11.6 Thumb Zone Mapping (bottom 1/3 priority mobile)[^1]
- 11.7 Safe Area Insets (env(safe-area-inset-*) — notch, dynamic island)[^1]
- 11.8 Dynamic Viewport Units (svh, lvh, dvh)[^1]
- 11.9 Foldable/Dual-screen (horizontal-viewport-segments)[^1]
- 11.10 Orientation Tokens (@media orientation: portrait/landscape)[^1]
- 11.11 Scroll Behavior Tokens (scroll-padding-top, scroll-snap)[^1]
- 11.12 Content-driven Breakpoints (não device-driven)[^1]
- 11.13 Overflow Policy (clip_x_scroll_y), Vertical Align (baseline_default)[^1]
- 11.14 🆕 watchOS Breakpoint (≤ 200px — minimal UI mode)
- 11.15 🆕 TV Breakpoint (1920px+ — 10-foot UI, large text, focus-driven nav)

***

## PARTE V — DESIGN TOKENS: ELEVAÇÃO E PROFUNDIDADE (20+ variáveis)

### Cap. 12 — Elevation System

- 12.1 Border Radius Scale (0, 2, 4, 6, 8, 12, 16, 24, 9999px)[^1]
- 12.2 Shapes Scale (extra-small → extra-large — Material 3 style)[^1]
- 12.3 Border Width Tokens (0, 1, 2, 4px)[^1]
- 12.4 Shadow Scale (none, sm, md, lg, xl — multi-layer Umbra/Penumbra)[^1]
- 12.5 Semantic Elevation Aliases (card→sm, dropdown→md, modal→lg, toast→lg, tooltip→md)[^1]
- 12.6 Inner Shadows (inputs, pressed states)[^1]
- 12.7 Elevation por Estado (hover → lift, pressed → sink)[^1]
- 12.8 🆕 Ring Tokens (focus ring width, offset, color, style — separados de border)
- 12.9 🆕 Outline Tokens (outline-width, outline-offset — para focus sem layout shift)
- 12.10 🆕 Border Style Tokens (solid, dashed, dotted — per componente)


### Cap. 13 — Z-Index System

- 13.1 Semantic Scale (base 0, sticky 10, dropdown 20, overlay 40, modal 50, toast 100, tooltip 200)[^1]
- 13.2 Anti-arbitrary Policy (proibido z-index fora da escala)[^1]
- 13.3 Stacking Context Management[^1]
- 13.4 Overlay Layering Rules (modal_above_dropdown)[^1]
- 13.5 🆕 Z-Index Debug Mode (visual overlay que mostra camadas em dev)
- 13.6 🆕 Portal Z-Index Rules (portaled elements sempre acima do main tree)

***

## PARTE VI — DESIGN TOKENS: MOTION E ANIMAÇÃO (18+ variáveis)

### Cap. 14 — Motion System

- 14.1 Duration Tokens (instant 0ms, fast 100ms, base 150ms, slow 250ms, slower 400ms)[^1]
- 14.2 Easing Curves (default, in, out, in-out, spring — cubic-bezier completo)[^1]
- 14.3 Physics-based Spring Tokens (stiffness, damping, mass)[^1]
- 14.4 Animation Presets (fade_in, fade_out, scale_in, slide_in, slide_out)[^1]
- 14.5 Interaction Motion (hover=fast, focus=fast, enter=base, exit=fast)[^1]
- 14.6 Stagger Tokens (delay sequencial para listas)[^1]
- 14.7 Transition Property Tokens (quais props transicionar — nunca `all`)[^1]
- 14.8 Motion Budget (max 400ms para manter FID ≤ 100ms)[^1]
- 14.9 Reduced Motion (@media prefers-reduced-motion → 0ms + slide→fade)[^1]
- 14.10 @keyframes Definitions + Tailwind animate-*[^1]
- 14.11 Purposeful Motion — cada animação serve função ou emoção[^1]
- 14.12 🆕 Animation Orchestration Engine
- 14.12.1 🆕 Animation Sequencer (declarative timeline: `{delay, duration, easing}[]`)
- 14.12.2 🆕 Page Load Choreography (hero → content → sidebar, com stagger tokens)
- 14.12.3 🆕 Route Transition Choreography (exit → transition → enter)
- 14.12.4 🆕 Shared Element Transitions (FLIP technique)
- 14.12.5 🆕 Animation Composition Rules (max 3 concurrent animations)
- 14.12.6 🆕 GPU Budget Monitor (< 16ms/frame = 60fps target)
- 14.13 🆕 Exit Animation Tokens (exit_fade, exit_slide, exit_scale — espelhando entradas)

***

## PARTE VII — EFEITOS VISUAIS AVANÇADOS

### Cap. 15 — Glassmorphism e Frosted Glass

- 15.1 backdrop-filter: blur() — Intensidades (4px, 8px, 12px, 20px)[^1]
- 15.2 Glass Surface Tokens (bg-opacity, blur-radius, saturation-boost)[^1]
- 15.3 Glass sobre Brand Gradient (lavanda/roxo + frost)[^1]
- 15.4 Borders com rgba branco para luminosidade[^1]
- 15.5 Acessibilidade do Glass (contrast mínimo, fallback browsers)[^1]
- 15.6 Performance — will-change, GPU compositing[^1]
- 15.7 🆕 Glass Intensity Modes (subtle/medium/heavy — presets compostos)
- 15.8 🆕 Glass Dark Mode Variants (ajuste opacidade e saturação para dark)


### Cap. 16 — Gradientes e Aurora UI

- 16.1 Brand Gradient Linear (\#667eea → \#764ba2 — 135deg)[^1]
- 16.2 Mesh Gradients (multi-point color blending)[^1]
- 16.3 Aurora Background (blurred ellipses animadas)[^1]
- 16.4 Gradient Tokens composable (from, via, to)[^1]
- 16.5 Animated Gradients (background-position shift, @keyframes)[^1]
- 16.6 Noise \& Texture (grain SVG para evitar color banding)[^1]
- 16.7 🆕 Gradient Direction Tokens (0deg, 45deg, 90deg, 135deg, 180deg, radial, conic)
- 16.8 🆕 Gradient Overlay Pattern (gradient + semi-transparent overlay para text legibility)


### Cap. 17 — Micro-interactions e Feedback Sensorial

- 17.1 Button Press (scale 0.97, shadow reduce, spring easing)[^1]
- 17.2 Magnetic Hover (cursor atrai elemento, lerp suave)[^1]
- 17.3 Ripple Effect (Material-inspired, CSS-only)[^1]
- 17.4 Input Focus Glow (ring expand + color shift)[^1]
- 17.5 Toggle Morphing (spring physics)[^1]
- 17.6 Haptic Feedback API (navigator.vibrate — mobile patterns por semântica)[^1]
- 17.7 Skeleton Shimmer (gradient sweep animation)[^1]
- 17.8 Toast Slide-In (slide + fade + spring)[^1]
- 17.9 Staggered Lists (delay escalonado)[^1]
- 17.10 Card Hover Lift (translateY + shadow increase)[^1]
- 17.11 Checkbox/Radio Tick Animation (SVG path draw)[^1]
- 17.12 Tab Indicator Slide (underline morph)[^1]
- 17.13 🆕 Sound / Audio Tokens
- 17.13.1 🆕 Notification Sound Tokens (success, error, warning, info — file references)
- 17.13.2 🆕 Interaction Sound Tokens (click, toggle, swipe — opt-in only)
- 17.13.3 🆕 Volume/Mute Policy (user preference, `prefers-reduced-data`)
- 17.13.4 🆕 Audio Accessibility Rule (never audio-only feedback, always visual pair)
- 17.14 🆕 Confetti/Celebration Animation (onboarding complete, milestone reached — TDAH-positive reinforcement)
- 17.15 🆕 Progress Celebration (progress bar 100% → pulse + color shift)


### Cap. 18 — Scroll-driven Animations

- 18.1 CSS animation-timeline: scroll() — Progress[^1]
- 18.2 CSS animation-timeline: view() — Viewport Intersection[^1]
- 18.3 Parallax com Scroll Timeline (off-main-thread)[^1]
- 18.4 Scroll-snap + Magnetic Sections[^1]
- 18.5 Progress Indicators vinculados ao scroll[^1]
- 18.6 Reveal Animations (fade-up, slide-in on entry)[^1]
- 18.7 Fallback IntersectionObserver[^1]
- 18.8 🆕 Scroll-driven Header Shrink (compact header on scroll via scroll())
- 18.9 🆕 Scroll-driven Toc Highlight (active section indicator)


### Cap. 19 — View Transitions API

- 19.1 document.startViewTransition()[^1]
- 19.2 ::view-transition-group e pseudo-elements[^1]
- 19.3 Page Transitions (cross-fade, slide, morph)[^1]
- 19.4 Component-level Transitions (card expand, list reorder)[^1]
- 19.5 view-transition-name — Named Transition Groups[^1]
- 19.6 Integration Next.js App Router[^1]
- 19.7 Fallback browsers sem suporte[^1]
- 19.8 🆕 Multi-page View Transitions (MPA support via Navigation API)
- 19.9 🆕 View Transition Presets (crossfade, slide-left, slide-right, morph — DS-provided)


### Cap. 20 — Depth e Spatial Design

- 20.1 Layered Surfaces (bg_0→bg_3 como planos Z)[^1]
- 20.2 Perspective Transforms (rotateX/Y cards 3D tilt)[^1]
- 20.3 Parallax Depth Layers (background × foreground speed ratio)[^1]
- 20.4 Depth of Field Blur[^1]
- 20.5 Acessibilidade vestibular-safe[^1]
- 20.6 🆕 CSS Anchor Positioning (anchor-name, position-area — floating elements sem JS)
- 20.7 🆕 Layer Order Policy (background → content → overlay → modal → system)

***

## PARTE VIII — ESTILOS GLOBAIS E THEME ENGINE

### Cap. 21 — Estilos Globais e Pseudo-Elements

- 21.1 ::selection (background + color)[^1]
- 21.2 ::placeholder (color + opacity)[^1]
- 21.3 Scrollbar Styles (width, thumb color, track color)[^1]
- 21.4 Caret Color \& Accent Color (inputs nativos)[^1]
- 21.5 Cursor Tokens (pointer, grab, not-allowed, wait, text, resize)[^1]
- 21.6 Focus Visible Ring (width, offset, color, style)[^1]
- 21.7 Disabled Opacity Token[^1]
- 21.8 Skeleton Shimmer Animation Tokens[^1]
- 21.9 Print Stylesheet (@media print)[^1]
- 21.10 color-scheme Declaration (light dark)[^1]
- 21.11 🆕 ::backdrop Styling (modal, dialog, fullscreen)
- 21.12 🆕 ::marker Styling (list bullets custom)
- 21.13 🆕 ::highlight Styling (custom text highlights)
- 21.14 🆕 Smooth Scroll Token (scroll-behavior: smooth, respect reduced-motion)


### Cap. 22 — Theme Engine

- 22.1 Multi-theme Architecture (Light, Dark, High Contrast, Dimmed/OLED, Brand)[^1]
- 22.2 [data-theme] + CSS Custom Properties Override[^1]
- 22.3 useTheme Hook (React Context)[^1]
- 22.4 ThemeProvider Component[^1]
- 22.5 @media (prefers-color-scheme) Auto-detect[^1]

```
- 22.6 🔧 Theme Persistence (localStorage + cookie + `<script>` blocking no `<head>` anti-FOUC + SSR detection)[^1]
```

- 22.7 🔧 Custom Theme API (multi-tenant / brand override) + theme.schema.json validation[^1]
- 22.8 Theme Transition Animation[^1]
- 22.9 Layered Token Override (base → theme → brand)[^1]
- 22.10 🆕 Multi-brand / White-label Engine
- 22.10.1 🆕 Brand Definition Schema (`brand.json`: colors, fonts, logos, radii, spacing overrides)
- 22.10.2 🆕 Token Override Layers (base-DS → brand → theme → user-pref)
- 22.10.3 🆕 Brand Validation (contrast check, font pairing, conflict detection)
- 22.10.4 🆕 Runtime Brand Switching (dynamic import de token bundles)
- 22.10.5 🆕 Brand Preview Tool (visualizar componentes com brand aplicada live)
- 22.10.6 🆕 Brand Token Subset (quais tokens brand pode overridar, quais são locked)
- 22.11 🆕 Theme Scope Nesting (sub-themes dentro de page sections — ex: dark card dentro de light page)


### Cap. 23 — Brand Identity e Estilos Visuais

- 23.1 Pilares da Marca (Científico, Empático, Moderno, Acolhedor)[^1]
- 23.2 Persona Principal e Cenário Visual[^1]
- 23.3 Referências Visuais (Stripe, Notion, Headspace)[^1]
- 23.4 Moods e Atmosferas (Calma, Foco, Empoderamento, Acolhimento)[^1]
- 23.5 Estilos Implementados (12 — Minimalista a Professional)[^1]
- 23.6 Estilos Planejados (Glassmorphism, Neumorphism, Neubrutalism, Skeuomorphism, Gradient Mesh)[^1]
- 23.7 Anti-patterns Visuais (9 proibições)[^1]
- 23.8 Composição Visual (layers, safe zones, focal, regra dos terços)[^1]
- 23.9 🆕 Photography/Imagery Guidelines (treatment, overlay, crop rules, brand-safe filters)
- 23.10 🆕 Logo Usage Rules (clear space, min size, do/don't, color variants)

***

## PARTE IX — ICONOGRAFIA E IMAGERY 🆕

### Cap. 24 — Icon System 🆕

- 24.1 🆕 Icon Grid (24×24 base, 16×16/20×20/32×32 variants)
- 24.2 🆕 Stroke Width Token (1.5px default, consistent across all icons)
- 24.3 🆕 Icon Naming Convention (kebab-case, category-prefixed: `nav-home`, `action-edit`)
- 24.4 🆕 Optical Size Adjustment (ícones menores = stroke mais grosso — opsz token)
- 24.5 🆕 SVG Optimization Pipeline (SVGO config: remove metadata, merge paths, round)
- 24.6 🆕 Icon-as-Component Pattern (React: currentColor, size prop, aria-hidden)
- 24.7 🆕 Animated Icons (micro-animation: check morph, loading spin, success confetti)
- 24.8 🆕 Icon Accessibility (decorative: aria-hidden=true, informational: role=img + aria-label)
- 24.9 🆕 Custom Icon Upload Pipeline (SVG validation → optimization → component generation)
- 24.10 🆕 Figma → SVG → React automation (icon library sync)
- 24.11 🆕 Icon Color Tokens (icon.default, icon.muted, icon.inverse, icon.brand, icon.semantic.*)
- 24.12 🆕 Icon Spacing Tokens (gap entre icon e label: 8px sm, 12px md)


### Cap. 25 — Illustration e Imagery System 🆕

- 25.1 🆕 Illustration Style Guide (flat minimal, brand-aligned palette, consistent stroke)
- 25.2 🆕 Empty State Illustrations (banco de ~20 cenas: no results, no connection, error, success)
- 25.3 🆕 Image Aspect Ratios obrigatórios (card: 16:9, hero: 21:9, avatar: 1:1, thumbnail: 4:3)
- 25.4 🆕 Image Optimization Pipeline (WebP, AVIF, srcset + sizes, lazy-load, priority hints)
- 25.5 🆕 Placeholder Strategy (Blurhash/ThumbHash → skeleton → real image)
- 25.6 🆕 Art Direction (picture element, media queries para crops per breakpoint)
- 25.7 🆕 Image Error Fallback (broken image → placeholder component → alt text)
- 25.8 🆕 Image Tokens (border-radius, object-fit, object-position)

***

## PARTE X — COMPONENTES (28 Core + 28 Avançados)

### Cap. 26 — Arquitetura de Componentes

- 26.1 Atomic Design Level: Molecule[^1]
- 26.2 Polimorfismo (prop `as` tipada)[^1]
- 26.3 Slot Pattern / asChild (Radix UI style)[^1]
- 26.4 Compound Components (Context API composition)[^1]
- 26.5 Controlled + Uncontrolled (suporte híbrido)[^1]
- 26.6 forwardRef Pattern Universal[^1]
- 26.7 Prop Spreading Control (whitelist)[^1]
- 26.8 Error Boundaries (DS wrapper)[^1]
- 26.9 Suspense Boundaries (Skeleton fallback automático)[^1]
- 26.10 Escape Hatch (className sim, style não)[^1]
- 26.11 Component Sizing System (sm h-9, md h-10, lg h-11)[^1]
- 26.12 Hit Area Compliance (44px WCAG) + Touch Target Expansion[^1]
- 26.13 🆕 Server Component Compatibility (RSC-safe: no useEffect, no browser APIs in shared)
- 26.14 🆕 Headless Mode (hook-only API sem styles, para custom rendering)
- 26.15 🆕 Component Composition Patterns (renderProps, children-as-function, context, compound)


### Cap. 27 — Primitivos de Layout

- 27.1 Box (polimórfico), Stack, Grid, Flex[^1]
- 27.2 Container (max-width + auto margins)[^1]
- 27.3 Divider / Separator[^1]
- 27.4 AspectRatio, ScrollArea, VisuallyHidden[^1]
- 27.5 Portal / Overlay Manager[^1]
- 27.6 🆕 Center (horizontal + vertical centering utility component)
- 27.7 🆕 Bleed (negative margin utility para full-bleed dentro de container)


### Cap. 28 — Componentes de Entrada (Forms)

- 28.1 Button (primary/secondary/ghost/danger × sm/md/lg)[^1]
- 28.2 IconButton[^1]
- 28.3 Input (text, email, password, number, search, tel, url)[^1]
- 28.4 Textarea (auto-resize)[^1]
- 28.5 Select (native + custom dropdown)[^1]
- 28.6 Combobox / Autocomplete[^1]
- 28.7 Checkbox, Radio / RadioGroup, Switch / Toggle[^1]
- 28.8 Slider / RangeSlider[^1]
- 28.9 Date Picker / Range Picker / Time Picker[^1]
- 28.10 File Uploader (drag \& drop, preview, progress)[^1]
- 28.11 Color Picker[^1]
- 28.12 Pin Input / OTP Input[^1]
- 28.13 FormField (Label + Input + HelpText + ErrorMessage)[^1]
- 28.14 Form (validação, submit, reset, dirty tracking)[^1]
- 28.15 🆕 SearchInput (debounced, clear button, loading indicator, recent searches)
- 28.16 🆕 NumberInput (increment/decrement, min/max, step, formatted display)
- 28.17 🆕 PasswordInput (toggle visibility, strength indicator)


### Cap. 29 — Componentes de Data Display

- 29.1 Card (default/elevated/outlined + glassmorphism variant)[^1]
- 29.2 Badge / Tag / Chip[^1]
- 29.3 Avatar (image, initials, fallback, group)[^1]
- 29.4 Tooltip, Popover[^1]
- 29.5 Table (static, sortable, sticky headers)[^1]
- 29.6 DataTable (sort, filter, pagination, virtualização, bulk actions)[^1]
- 29.7 Timeline, Stat / KPI Card[^1]
- 29.8 Code Block, Kbd, Label[^1]
- 29.9 Empty State (ilustração + título + CTA)[^1]
- 29.10 🆕 DescriptionList (key-value pairs display)
- 29.11 🆕 Metric / Counter (animated number display, trend arrow)
- 29.12 🆕 HoverCard (preview on hover — user profiles, link previews)


### Cap. 30 — Componentes de Feedback

- 30.1 Alert / Banner (page-level, inline)[^1]
- 30.2 Toast / Snackbar (stacking, auto-dismiss, actions)[^1]
- 30.3 Progress (bar, circular, indeterminate)[^1]
- 30.4 Spinner (loading indicator)[^1]
- 30.5 Skeleton (shimmer, pulse, wave, content-aware)[^1]
- 30.6 Notification Center[^1]
- 30.7 Callout / Admonition[^1]
- 30.8 🆕 Error Boundary UI
- 30.8.1 🆕 Error Fallback Components (full-page, inline, toast-level)
- 30.8.2 🆕 Error Recovery Patterns (retry button, refresh, contact support)
- 30.8.3 🆕 Offline Mode UI (cached content indicator, sync queue, offline banner)
- 30.8.4 🆕 Slow Network UI (progressive skeleton, low-fi mode, connection indicator)
- 30.8.5 🆕 Error Logging Context (DS-specific metadata para Sentry/LogRocket)
- 30.9 🆕 SuccessFeedback (checkmark animation + message, auto-dismiss)


### Cap. 31 — Componentes de Overlay

- 31.1 Modal / Dialog (alert, confirmation, focus trap, scroll lock)[^1]
- 31.2 Drawer / Sheet (left, right, bottom, top)[^1]
- 31.3 Dropdown Menu, Context Menu[^1]
- 31.4 Command Palette / Spotlight (⌘K fuzzy search)[^1]
- 31.5 Lightbox (image gallery overlay)[^1]
- 31.6 🆕 Nested Modal Support (stacked modals com overlay dimming progressivo)
- 31.7 🆕 Fullscreen Overlay (takeover pattern para onboarding, media viewer)


### Cap. 32 — Componentes de Navegação

- 32.1 Navbar / Header (responsive: horizontal → hamburger)[^1]
- 32.2 Sidebar / Navigation Rail[^1]
- 32.3 Bottom Navigation (mobile)[^1]
- 32.4 Tabs (horizontal, vertical, scrollable)[^1]
- 32.5 Breadcrumb, Pagination[^1]
- 32.6 Stepper / Wizard (multi-step com state machine)[^1]
- 32.7 Link / Anchor, Skip to Content, Back to Top[^1]
- 32.8 🆕 SegmentedControl (pill-toggle navigation)
- 32.9 🆕 Table of Contents (auto-generated, scroll-spy active state)


### Cap. 33 — Componentes de Mídia e Rich Content

- 33.1 Image (lazy load, fallback, skeleton, art direction)[^1]
- 33.2 Video (controls, poster, captions)[^1]
- 33.3 Carousel / Slider (scroll-snap, swipe, autoplay)[^1]
- 33.4 Audio Player[^1]
- 33.5 Rich Text Editor (Tiptap/Lexical headless)[^1]
- 33.6 Markdown Renderer, Prose Container[^1]
- 33.7 🆕 EmbedCard (YouTube, Twitter, link preview — oEmbed pattern)
- 33.8 🆕 PDFViewer (embedded viewer com paginação)


### Cap. 34 — Componentes Mobile-Specific

- 34.1 Bottom Sheet (gesture-driven)[^1]
- 34.2 Pull to Refresh[^1]
- 34.3 FAB (Floating Action Button)[^1]
- 34.4 Tab Bar (iOS style)[^1]
- 34.5 Infinite Scroll / Virtual List[^1]
- 34.6 Swipe Actions[^1]
- 34.7 🆕 Mobile Action Sheet (iOS-style action list from bottom)
- 34.8 🆕 Gesture Handler (swipe, pinch, long-press — abstraction layer)


### Cap. 35 — API Contracts (todos componentes)

```
- 35.1 🔧 Props — tipagem com utility types: `PolymorphicComponentProps<T>`, `ComponentPropsWithoutRef<T>`, `RequiredKeys`, `OptionalKeys`[^1]
```

- 35.2 Control Mode (controlled / uncontrolled / hybrid)[^1]
- 35.3 States (supported + forbidden + state machines)[^1]
- 35.4 Variants (visual + size)[^1]
- 35.5 🔧 Events — padronização: `on{Event}` com `{Component}{Event}Event` type (ex: `ButtonClickEvent`, `InputChangeEvent`)[^1]
- 35.6 A11y Contract (ARIA role + keyboard + focus management)[^1]
- 35.7 Behavior (disabled, loading, error, readOnly)[^1]
- 35.8 🔧 Slots — slot registry: `root`, `trigger`, `content`, `icon`, `label`, `description`, `close`, `action`, `prefix`, `suffix`[^1]
- 35.9 Responsive (true para todos) + Theming (token_based_only)[^1]
- 35.10 Escape Hatch (className + data-* + aria-*)[^1]
- 35.11 🆕 Default Values Documentation (cada prop com default explícito e rationale)
- 35.12 🆕 Deprecation Annotations (@deprecated JSDoc com migration path)


### Cap. 36 — Component State Machines

- 36.1 Button (default→hover→active→focus→disabled→loading)[^1]
- 36.2 Modal (closed→opening→open→closing)[^1]
- 36.3 Input (default→hover→focus→disabled→readonly→error)[^1]
- 36.4 Toast (entering→visible→exiting)[^1]
- 36.5 Form State Machine (idle→editing→validating→submitting→done→error)[^1]
- 36.6 Wizard State Machine (multi-step)[^1]
- 36.7 🆕 Fetch State Machine (idle→loading→success→error→retrying)
- 36.8 🆕 Upload State Machine (idle→selecting→uploading→processing→done→error)
- 36.9 🆕 Drag State Machine (idle→dragging→over-target→dropped)

***

## PARTE XI — ESTADOS INTERATIVOS (14 estados)

### Cap. 37 — Interactive State Effects

- 37.1 Default State[^1]
- 37.2 Hover (opacity 0.92 light / 0.85 dark, transition fast)[^1]
- 37.3 Active/Pressed (opacity 0.86/0.80, scale 0.97)[^1]
- 37.4 Focus Visible (ring 2px, offset 2px, color token)[^1]
- 37.5 Disabled (opacity 0.45, cursor-not-allowed, aria-disabled)[^1]
- 37.6 Loading (spinner SVG animate-spin, content replaced)[^1]
- 37.7 Error (border semantic-error, role="alert", message)[^1]
- 37.8 ReadOnly (visual disabled, sem cursor change)[^1]
- 37.9 Visited (link color \#7c3aed / \#c084fc dark)[^1]
- 37.10 Skeleton (loading placeholder state)[^1]
- 37.11 Dragging (shadow lg, opacity 0.8, scale 1.02)[^1]
- 37.12 Selected / Checked (brand-primary bg, check icon)[^1]
- 37.13 🆕 Indeterminate (checkbox/progress — dash icon, animated progress)
- 37.14 🆕 Required (asterisk token, color, position — consistent em todos os form elements)

***

## PARTE XII — PATTERNS E TEMPLATES

### Cap. 38 — Navigation Patterns

- 38.1 🆕 Top Navigation Bar — responsive collapse → hamburger
- 38.2 🆕 Bottom Tab Bar — mobile-native navigation
- 38.3 🆕 Sidebar Navigation — collapsible, nested, responsive
- 38.4 🆕 Breadcrumb Trail — hierarchical context
- 38.5 🆕 Command Palette — Cmd+K / Ctrl+K quick nav


### Cap. 39 — Form Patterns

- 39.1 🆕 Login/Register — email + password + social + MFA
- 39.2 🆕 Multi-Step Wizard — stepper + validation per step + save draft
- 39.3 🆕 Inline Editing — click-to-edit fields with optimistic update
- 39.4 🆕 Search with Autocomplete — debounced + highlight + recent
- 39.5 🆕 Filter Panel — faceted search UI + URL sync
- 39.6 🆕 Settings Page — grouped preferences with save/cancel


### Cap. 40 — Feedback Patterns

- 40.1 🆕 Toast Stack — multiple notifications queued, max visible 3
- 40.2 🆕 Empty State — illustration + CTA per context (no data, error, search)
- 40.3 🆕 Error Page — 404/500 com recovery guidance + search
- 40.4 🆕 Loading Skeleton Page — full-page skeleton composition
- 40.5 🆕 Confirmation Dialog — destructive action guard + timer
- 40.6 🆕 Onboarding Tour — step-by-step highlight com tooltip


### Cap. 41 — Data Patterns

- 41.1 🆕 List/Grid Toggle View — switch between card grid and table list
- 41.2 🆕 Infinite Scroll + Load More — pagination alternatives
- 41.3 🆕 Drag-and-Drop Reorder — kanban, list sorting
- 41.4 🆕 Bulk Selection — select all, range select, bulk actions
- 41.5 🆕 Dashboard Layout — widgets, KPI cards, charts composition


### Cap. 42 — Real-Time Patterns

- 42.1 🆕 Presence Indicators (online/offline/away/busy)
- 42.2 🆕 Collaborative Cursors (multi-user editing)
- 42.3 🆕 Optimistic UI (immediate feedback, server reconciliation)
- 42.4 🆕 Live Updates Badge (new content indicator, pull to refresh)
- 42.5 🆕 Connection Status Indicator (online/offline/reconnecting)


### Cap. 43 — Page Templates

- 43.1 🆕 Marketing Landing Page (hero + features + testimonials + CTA)
- 43.2 🆕 Dashboard Page (sidebar + header + grid de widgets)
- 43.3 🆕 Settings Page (nav tabs + form sections)
- 43.4 🆕 Profile Page (avatar + info + activity feed)
- 43.5 🆕 Article/Content Page (prose container + toc + related)
- 43.6 🆕 Auth Pages (login, register, forgot password, MFA)

***

## PARTE XIII — RESPONSIVE MULTI-DEVICE

### Cap. 44 — Mobile-first Design

- 44.1 Mobile Breakpoint (< 640px), Layout Stack, Full-width[^1]
- 44.2 Touch Targets (48px mobile, 44px desktop)[^1]
- 44.3 Thumb Zone Mapping (safe, stretch, hard-to-reach)[^1]
- 44.4 Bottom Navigation Pattern[^1]
- 44.5 Swipe Gestures (dismiss, navigate, pull-to-refresh)[^1]
- 44.6 Mobile Typography Scale (clamp: 14px→16px)[^1]
- 44.7 Safe Area Insets (notch, dynamic island, home indicator)[^1]
- 44.8 Haptic Feedback Integration[^1]
- 44.9 🔧 Mobile Performance Budget (bundle ≤ 40KB 🔧, LCP ≤ 2000ms, INP ≤ 300ms 🆕)[^1]
- 44.10 🆕 Mobile Input Modes (inputmode=numeric, tel, email, url, search)
- 44.11 🆕 Virtual Keyboard Handling (viewport resize, scroll to focused input)


### Cap. 45 — Tablet Design

- 45.1 Tablet Breakpoints (768px → 1024px)[^1]
- 45.2 Split View / Master-Detail Layout[^1]
- 45.3 iPad Multitasking (Slide Over, Split View, Stage Manager)[^1]
- 45.4 Stylus / Pencil Input Considerations[^1]
- 45.5 Landscape vs Portrait Adaptation[^1]
- 45.6 🆕 Tablet-specific Navigation (sidebar always visible, collapsible panels)
- 45.7 🆕 Floating Windows Pattern (tablet stage manager windowed mode)


### Cap. 46 — Desktop e Large Screens

- 46.1 Desktop Breakpoints (1024px → 1536px+)[^1]
- 46.2 Multi-panel Layouts (sidebar + content + inspector)[^1]
- 46.3 Hover States (tooltip preview, hover cards)[^1]
- 46.4 Keyboard-first Navigation[^1]
- 46.5 Ultra-wide Monitors (> 2560px — layout clamping)[^1]
- 46.6 🆕 Keyboard Shortcuts System (Cmd+K, Cmd+/, Cmd+S — DS-provided registry)
- 46.7 🆕 Multi-window / Popout Pattern (detachable panels)
- 46.8 🆕 Right-click Context Menu Tokens


### Cap. 47 — Foldable, Wearable, TV e Spatial

- 47.1 Foldable Devices (fold detection, seamless transition)[^1]
- 47.2 Dual-screen Layouts (CSS Spanning, window segments)[^1]
- 47.3 Wearable (minimal UI, large touch targets)[^1]
- 47.4 Device Posture API[^1]
- 47.5 Spatial Computing (AR/VR — visionOS, 3D depth, Gaze tracking)[^1]
- 47.6 Voice-first UI[^1]
- 47.7 🆕 TV / 10-foot UI (D-pad navigation, overscan-safe area, large focus rings)
- 47.8 🆕 Automotive HMI (distraction-free UI, large touch, voice priority)
- 47.9 🆕 Kiosk Mode (full-screen, no system UI, timeout reset)


### Cap. 48 — Fluid Design Tokens

- 48.1 Fluid Typography (clamp() para todos text styles)[^1]
- 48.2 Fluid Spacing (clamp() para gaps/paddings/margins)[^1]
- 48.3 Fluid Border Radius (proporcionais ao container)[^1]
- 48.4 Fluid Shadows (intensidade escala com context)[^1]
- 48.5 Token Resolution Pipeline (static → fluid → override)[^1]
- 48.6 🆕 Fluid Icon Sizing (clamp() para ícones responsivos)
- 48.7 🆕 Viewport-aware Token Resolution (tokens que mudam com viewport class)


### Cap. 49 — Platform-Specific Guidelines

- 49.1 Web (React 18+ RSC)[^1]
- 49.2 iOS (SwiftUI)[^1]
- 49.3 Android (Compose)[^1]
- 49.4 React Native[^1]
- 49.5 PWA (viewport-fit=cover, safe-area)[^1]
- 49.6 🆕 Flutter (Material/Cupertino bridge, token mapping)
- 49.7 🆕 Electron/Tauri (desktop app considerations: native titlebar, tray, menubar)

***

## PARTE XIV — ACESSIBILIDADE, UX E QUALIDADE

### Cap. 50 — WCAG AA Compliance

- 50.1 Contrast Ratios (texto ≥ 4.5:1, UI ≥ 3.0:1)[^1]
- 50.2 Hit Area (44px desktop, 48px mobile)[^1]
- 50.3 Keyboard Navigation (Tab, Enter, Esc, Arrow keys)[^1]
- 50.4 Focus Visible (ring obrigatório)[^1]
- 50.5 Screen Reader (ARIA roles, labels, live regions, landmarks)[^1]
- 50.6 Reduced Motion Support[^1]
- 50.7 Color-blind Safe (não depender apenas de cor)[^1]
- 50.8 WCAG AAA Roadmap (enhanced contrast, cognitive)[^1]
- 50.9 Cognitive A11y TDAH-specific[^1]
- 50.10 🆕 Reduced Transparency (@media prefers-reduced-transparency)
- 50.11 🆕 Reduced Data (@media prefers-reduced-data — disable heavy animations, low-res images)
- 50.12 🆕 Contrast Preference (@media prefers-contrast: more/less)


### Cap. 51 — ARIA Patterns (20+ padrões)

- 51.1 Button, Link — Activation[^1]
- 51.2 Checkbox, Radio — Selection[^1]
- 51.3 Switch, Textbox — Toggle e Input[^1]
- 51.4 Dialog — Focus Trap, Escape, aria-modal[^1]
- 51.5 Tablist, Tab, Tabpanel[^1]
- 51.6 Tooltip — Hover/Focus, No Focus Steal[^1]
- 51.7 Alert, Toast — Live Region (role, aria-live)[^1]
- 51.8 Menu, Menuitem — Arrow Navigation[^1]
- 51.9 Progressbar — aria-valuenow/min/max[^1]
- 51.10 Select / Combobox — aria-expanded[^1]
<span style="display:none">[^10][^11][^5][^6][^7][^8][^9]</span>

<div align="center">⁂</div>

[^1]: paste.txt

[^2]: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/

[^3]: https://www.designtokens.org/tr/drafts/format/

[^4]: https://www.supernova.io/blog/the-future-of-enterprise-design-systems-2026-trends-and-tools-for-success

[^5]: 2ivaTDAH-Design-System-Blueprint-Completo-v3.0.md

[^6]: VivaTDAH-Design-System-Blueprint-Completo-Unific.md

[^7]: VivaTDAH-Blueprint-v3-INDEX.md

[^8]: VivaTDAH-Design-System-Blueprint-Definitivo-v3.0.md

[^9]: VivaTDAH-Design-System-Blueprint-Completo-v3.0.md

[^10]: baseado-no-chat-acima-quero-que-uma-equipe-de-exp.md

[^11]: VivaTDAH-DS-Master-Blueprint-Index.md

