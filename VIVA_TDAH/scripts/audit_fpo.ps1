Write-Host "🧹 Auditoria FPO / Placeholder"

$placeholders = @("lorem", "ipsum", "placeholder", "fpo")
$found = $false

$files = Get-ChildItem -Recurse -Include *.md,*.html,*.js -ErrorAction SilentlyContinue

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw
  foreach ($word in $placeholders) {
    if ($content -match $word) {
      Write-Warning "Placeholder encontrado em $($file.FullName): '$word'"
      $found = $true
    }
  }
}

if ($found) {
  Write-Host "❌ Auditoria FPO falhou."
  exit 1
}

Write-Host "✅ Nenhum placeholder encontrado."
