param(
  [string]$RepoRoot = (Resolve-Path ".").Path
)

$srcRoot = Join-Path $RepoRoot "VIVA_TDAH"
$dstRoot = Join-Path $RepoRoot "apps\blog\_viva_tdah"

Write-Host "Sync FULL: $srcRoot -> $dstRoot"

if (!(Test-Path $srcRoot)) { throw "Fonte não existe: $srcRoot" }

New-Item -ItemType Directory -Force $dstRoot | Out-Null

# Espelha tudo (copia e apaga o que saiu da origem)
robocopy $srcRoot $dstRoot /MIR /XD "node_modules" ".git" /NFL /NDL /NJH /NJS /NP | Out-Null

Write-Host "OK: sync FULL concluído."
