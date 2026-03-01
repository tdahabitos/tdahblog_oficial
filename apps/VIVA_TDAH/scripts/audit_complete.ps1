Write-Host "🔍 Auditoria Completa VivaTDAH"

$errors = @()

# Verifica estrutura mínima
$requiredPaths = @(
  "content/drafts",
  "content/posts",
  "docs",
  "templates"
)

foreach ($path in $requiredPaths) {
  if (-not (Test-Path $path)) {
    $errors += "Caminho ausente: $path"
  }
}

# Verifica posts publicados
$posts = Get-ChildItem content/posts -Filter *.md -Recurse -ErrorAction SilentlyContinue
if ($posts.Count -eq 0) {
  Write-Warning "Nenhum post publicado encontrado."
}

if ($errors.Count -gt 0) {
  Write-Host "❌ Auditoria falhou:"
  $errors | ForEach-Object { Write-Host " - $_" }
  exit 1
}

Write-Host "✅ Auditoria completa concluída com sucesso."
