# TDAH.blog — Brief Editorial Terapêutico-Cognitivo (Fonte Única de Verdade)

## 1) Quem é essa mulher (real, não genérica)

- Faixa etária: 30–60
- Perfil cognitivo:
  - distração fácil
  - fadiga visual rápida
  - hiperfoco em leitura quando o ambiente é calmo
  - rejeição a estímulo excessivo (visual ou emocional)

- Estado emocional dominante:
  - sobrecarga
  - culpa por não render
  - desejo de clareza sem pressão
  - medo de se sentir “atrasada” ou “menos capaz”

- O que ela busca no TDAH.blog:
  - compreensão adulta (sem infantilização)
  - linguagem clara com precisão científica
  - sensação de “finalmente alguém me entende”
  - alívio cognitivo: o texto organiza o pensamento
  - pequenas ações possíveis (não mais uma lista impossível)

- O que ela NÃO tolera:
  - visual infantil
  - estética coaching
  - frases motivacionais vazias
  - layout apertado e sem respiro
  - contraste agressivo (branco/preto puros)
  - excesso de cores e elementos competindo
  - “cara de SaaS” e dashboard frio
  - popups e urgência


## 2) Estado neurológico de quem chega

A maioria chega no blog em estado de:

- exaustão cognitiva
- atenção fragmentada
- ansiedade leve
- esperança cautelosa
- sensibilidade aumentada a estímulos

Objetivo do design:

transformar isso em:

- calma corporal (primeiro minuto)
- previsibilidade espacial (primeiros 10 segundos)
- foco sustentado (até 5 minutos)
- confiança intelectual (sem rigidez)
- vontade de continuar lendo


## 3) Função real do TDAH.blog

O TDAH.blog não é:

- portal de notícias
- blog de produtividade
- site médico frio
- feed de dicas rápidas

Ele é:

- ambiente editorial terapêutico-cognitivo
- tradução da ciência em linguagem adulta
- lugar seguro para reorganizar o pensamento
- leitura profunda com pausas
- ponte entre “entender” e “aplicar sem se violentar”


## 4) Anti-padrões visuais (proibições)

Nunca usar:

- branco puro (#ffffff)
- preto puro (#000000)
- roxo saturado neon
- gradientes chamativos
- fontes finas demais
- layout largo para leitura (texto “espalhado”)
- cards apertados e densos
- excesso de ícones
- muitas cores simultâneas
- animações decorativas
- estética startup/SaaS
- visual adolescente
- popups agressivos
- banners piscando ou elementos disputando atenção


## 5) Sensação final esperada (após 3 minutos)

Depois de 3 minutos no TDAH.blog, a leitora deve sentir:

- corpo mais calmo
- mente menos acelerada
- clareza progressiva
- respeito intelectual (sem arrogância)
- confiança de que “dá pra continuar”
- vontade de salvar, voltar e compartilhar


## 6) Contrato de design (nomes semânticos obrigatórios)

Tudo no frontend deve consumir **tokens semânticos**, nunca primitivos.

Semânticos mínimos obrigatórios:

- surfaces: `surface.0..3`
- text: `text.primary / secondary / muted / inverse`
- brand: `brand.primary / secondary / soft / whisper`
- borders: `border.subtle / default / strong / focus`
- states: `state.hoverBg / activeBg / disabledBg / disabledText`
- shadows: `shadow.sm / md / lg`
- radius: `radius.2 / 4 / 8 / 12 / 16 / 24 / 9999`
- spacing: escala base 4 (0..128)
- typography: `fontFamily.editorial / ui`, `fontWeight.*`, `fontSize.*`, `lineHeight.*`
- motion: `duration.*` + `easing.*`

Regras:
- componentes nunca hardcodam HEX
- componentes nunca usam `primitives.*` diretamente
- links sempre sublinhados
- TOC obrigatório em texto longo
- coluna de leitura estreita (≈ 62ch)
