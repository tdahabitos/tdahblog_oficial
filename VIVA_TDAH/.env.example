Write-Host "🧪 Validação rápida — VivaTDAH"

$errors = @()

$requiredPaths = @(
  "content",
  "docs",
  "templates",
  "scripts",
  "public"
)

foreach ($path in $requiredPaths) {
  if (-not (Test-Path $path)) {
    $errors += "Diretório obrigatório ausente: $path"
  }
}

if ($errors.Count -gt 0) {
  Write-Host "❌ Falha de validação:"
  $errors | ForEach-Object { Write-Host " - $_" }
  exit 1
}

Write-Host "✅ Estrutura básica validada com sucesso."
