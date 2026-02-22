# QA Checklist — TDAH.blog (TDAH + A11y + Legibilidade)

Este checklist é binário: PASSA ou FALHA.
Faça com 1 artigo real aberto no navegador (desktop + mobile).


## 8.1 Testes rápidos (passa/falha)

Marque PASSA/FALHA e anote 1 linha se falhar.

### Leitura e fadiga
- [ ] PASSA / [ ] FALHA — Consigo ler 5 min sem fadiga?
- [ ] PASSA / [ ] FALHA — O layout tem respiro suficiente (não fica “apertado”)?
- [ ] PASSA / [ ] FALHA — A largura do texto está confortável (≈ 62ch)?

### Navegação e previsibilidade
- [ ] PASSA / [ ] FALHA — Links são visíveis sem hover (sublinhado + cor)?
- [ ] PASSA / [ ] FALHA — Títulos (H2/H3) criam um mapa claro do texto?
- [ ] PASSA / [ ] FALHA — TOC ajuda a navegar sem ansiedade?
- [ ] PASSA / [ ] FALHA — No mobile, o TOC colapsa e não polui a leitura?

### Acessibilidade e interação
- [ ] PASSA / [ ] FALHA — Focus ring aparece em tudo que interage (links, botões, inputs)?
- [ ] PASSA / [ ] FALHA — Contraste não é agressivo (sem branco/preto puros)?
- [ ] PASSA / [ ] FALHA — Não há animações decorativas (especialmente em texto)?

### Ruído visual (TDAH)
- [ ] PASSA / [ ] FALHA — Não existe “competição visual” (muitos elementos chamando atenção)?
- [ ] PASSA / [ ] FALHA — Callouts são usados como pausa (não como propaganda)?
- [ ] PASSA / [ ] FALHA — O fim do artigo tem um “próximo passo” suave (sem urgência)?


## 8.2 Testes de consistência (design system)

Faça estas verificações no código (CSS/TSX).

### Tokens e cores
- [ ] PASSA / [ ] FALHA — Nenhum componente usa cor hardcoded fora dos tokens
  - Exemplo de falha: `color: #6B5CA5` dentro do componente
  - Correto: `color: var(--color-semantic-brand-primary)` ou classe que aponta para token

- [ ] PASSA / [ ] FALHA — Todos usam semantic tokens e não primitives direto
  - Exemplo de falha: usar `--color-primitives-lavender-700` em componente
  - Correto: usar `--color-semantic-brand-primary`

### Tipografia e espaçamento
- [ ] PASSA / [ ] FALHA — Fontes vêm de tokens (editorial/UI), sem hardcode
- [ ] PASSA / [ ] FALHA — Spacing e radius vêm de tokens, sem números “soltos”
- [ ] PASSA / [ ] FALHA — Shadows vêm de tokens (sm/md/lg), sem sombras inventadas

### Layout e largura de leitura
- [ ] PASSA / [ ] FALHA — Prose respeita `layout.readingWidth` (≈ 62ch)
- [ ] PASSA / [ ] FALHA — Nenhum componente quebra o container (overflow ou grid competindo)


## Resultado

Data: ____/____/____  
Artigo testado: __________________________

Falhas encontradas (lista curta):
- 1)
- 2)
- 3)

Próxima ação (1 só):
- __________________________
