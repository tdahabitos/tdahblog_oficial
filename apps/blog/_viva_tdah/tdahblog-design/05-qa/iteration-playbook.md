# Iteration Playbook — TDAH.blog

Objetivo: evoluir a experiência do blog sem gerar caos, regressões ou drift de design.

Este processo é obrigatório sempre que algo “parecer errado”.


## Regra de ouro

Nunca mexa em 10 coisas de uma vez.

Sempre:

- 1 problema
- 1 grupo de tokens
- 1 artigo de teste
- 1 decisão (aprova ou reverte)


## Ciclo padrão (15–25 minutos)

### 1) Escolha UM problema

Exemplos válidos:

- “Texto cansativo depois de 3 minutos”
- “Links não chamam atenção suficiente”
- “Callout parece pesado”
- “Dark mode está opressivo”
- “TOC distrai”

Escreva aqui:

Problema atual: ____________________________________


### 2) Mapeie para tokens (somente tokens)

Nunca ajuste componente direto.

Pergunta guia:
> qual token controla isso?

Exemplos:

- fadiga → typography.lineHeight.body
- contraste → color.semantic.text.*
- peso visual → color.semantic.surface.*
- CTA forte demais → color.semantic.brand.*
- densidade → spacing.*

Tokens que vou mexer:

- ____________________________________
- ____________________________________


### 3) Ajuste pequeno

Regra prática:

- cor: no máximo ±1 step da escala
- line-height: ±0.05
- font-size: ±0.05rem
- spacing: ±4 ou ±8

Anote o que mudou:

Antes:
- token: valor

Depois:
- token: valor


### 4) Re-renderize 1 artigo teste

Sempre o mesmo artigo.

Abra:

- desktop
- mobile

Leia 3–5 minutos.


### 5) Decisão binária

Marque um:

- [ ] APROVADO → manter mudança
- [ ] REVERTER → voltar token original

Se aprovado:
- commit
- atualizar `decision-log.md` (1 linha)

Se revertido:
- descartar sem culpa.


## Registro rápido de iterações

Use esta tabela:

Data | Problema | Token mexido | Resultado
-----|----------|--------------|----------
     |          |              |


## Anti-padrões (proibido)

- mexer em componente direto
- mudar mais de 1 área por ciclo
- testar em múltiplos artigos
- confiar só no “olhômetro”
- não documentar


## Lembrete importante

Este sistema foi desenhado para cérebros TDAH.

Você não está buscando “perfeição visual”.

Você está buscando:

- menos fadiga
- mais leitura
- mais calma
- mais continuidade
