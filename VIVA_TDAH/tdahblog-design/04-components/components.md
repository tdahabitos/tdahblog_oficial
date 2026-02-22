# Componentes mínimos — TDAH.blog

Este arquivo define os componentes essenciais para publicar com consistência.
Todos os componentes consomem tokens via CSS variables.

Regra geral:
- sem hardcode de cores, fontes ou espaçamentos
- tudo vem de tokens
- estímulo mínimo
- previsibilidade espacial


## 1) Prose

Responsável por tipografia e ritmo do texto.

### Uso
Wrapper do conteúdo principal do artigo.

### Regras
- largura máxima: `layout.readingWidth` (62ch)
- fonte: `typography.fontFamily.editorial`
- line-height: `typography.lineHeight.body`
- H2 cria pausa visual (spacing.section)
- parágrafos usam spacing.paragraph

### Estrutura esperada

- H1 (hero)
- H2 frequentes
- listas curtas (máx 5 itens)
- nenhum grid dentro da Prose


## 2) Callout

Bloco de pausa cognitiva.

Três variações:

### a) Callout / Resumo

Uso:
- mapa do texto
- síntese inicial

Tokens:
- background: color.semantic.brand.whisper
- border: color.semantic.brand.soft
- radius: radius.12
- padding: spacing.24

Tom: neutro, sem CTA.

---

### b) Callout / Ciência

Uso:
- explicação científica traduzida
- 1 ideia por bloco

Mesmo visual do resumo, com label “Ciência”.

---

### c) Callout / Prática

Uso:
- microação
- versão mínima / versão completa

Mesmo visual, com label “Prática”.

---

## 3) Blockquote

Validação emocional adulta ou frase-chave.

### Visual

- borda esquerda: color.semantic.brand.primary
- fundo: mistura brand.whisper + surface.0
- padding: spacing.20–24
- fonte: editorial
- sem aspas decorativas

### Uso
Apenas quando agrega significado emocional ou síntese.


## 4) Link

Links sempre distinguíveis.

### Regras

- sempre sublinhado
- cor: color.semantic.brand.primary
- hover: brand.primary escurecido
- underline-offset: 3px

Nunca usar links apenas por cor.


## 5) TOC (Table of Contents)

Índice do artigo.

### Comportamento

Desktop:
- sticky
- coluna lateral estreita

Mobile:
- colapsável (`<details>`)

### Visual

- background: surface.1
- border: surface.3
- radius: radius.12
- padding: spacing.16

Links do TOC:
- fonte UI
- tamanho pequeno
- hover com brand.whisper

Obrigatório em artigos longos.


## 6) ArticleCard

Card de recomendação (“Leia também”).

### Conteúdo

- título
- tempo de leitura
- categoria (opcional)

Imagem é opcional.

### Visual

- background: surface.1
- border: surface.3
- radius: radius.12
- padding: spacing.16
- hover:
  - background: brand.whisper
  - border: brand.soft

Grid:
- mobile: 1 coluna
- desktop: 3 colunas


## 7) Tag / Badge

Identificação de temas (ex: “ciência”, “prática”).

### Visual

- background: surface.2
- texto: text.secondary
- radius: radius.9999
- padding: 4px 10px
- fonte UI pequena

Uso apenas informativo, nunca decorativo.


## 8) Divider

Separador visual entre blocos grandes.

### Visual

- altura: 1px
- cor: surface.3
- margem vertical: spacing.40

Nunca usar mais de um seguido.


# Regras globais de componentes

- nenhum componente pode usar branco puro ou preto puro
- nenhum componente pode animar texto
- nenhum componente pode quebrar largura de leitura
- todo spacing vem de tokens
- todo border-radius vem de tokens
- toda sombra vem de tokens


# Checklist rápido (QA)

Antes de publicar:

- Prose respeita 62ch?
- TOC aparece?
- Links estão sublinhados?
- Existe ao menos um Callout?
- “Leia também” tem cards?
- Rodapé é calmo?
- Nada piscando?
