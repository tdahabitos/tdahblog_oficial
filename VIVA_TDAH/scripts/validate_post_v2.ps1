param(
  [Parameter(Mandatory = $true)]
  [string]$PostPath
)

Write-Host "🔎 Validando post: $PostPath"

if (-not (Test-Path $PostPath)) {
  Write-Error "Arquivo não encontrado."
  exit 1
}

$content = Get-Content $PostPath -Raw

# Frontmatter
if ($content -notmatch "^---[\s\S]+?---") {
  Write-Error "Frontmatter YAML ausente."
  exit 1
}

$requiredFields = @("title:", "slug:", "persona:", "phase:", "cluster:", "cta_primary:")

foreach ($field in $requiredFields) {
  if ($content -notmatch $field) {
    Write-Error "Campo obrigatório ausente: $field"
    exit 1
  }
}

# Estrutura mínima
$requiredSections = @(
  "## TL;DR",
  "## Contexto Neurobiológico",
  "## O que está realmente acontecendo",
  "## O erro mais comum",
  "## O que ajuda de verdade",
  "## Próximo Passo"
)

foreach ($section in $requiredSections) {
  if ($content -notmatch [regex]::Escape($section)) {
    Write-Error "Seção obrigatória ausente: $section"
    exit 1
  }
}

Write-Host "✅ Post validado com sucesso."
