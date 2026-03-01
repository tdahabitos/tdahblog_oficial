param(
  [string]$RepoRoot = (Resolve-Path ".").Path
)

$srcContent = Join-Path $RepoRoot "VIVA_TDAH\content"
$srcPublic  = Join-Path $RepoRoot "VIVA_TDAH\public"

$dstContent = Join-Path $RepoRoot "apps\blog\src\content"
$dstPublic  = Join-Path $RepoRoot "apps\blog\public"

Write-Host "Sync: $srcContent -> $dstContent"
Write-Host "Sync: $srcPublic  -> $dstPublic"

if (!(Test-Path $srcContent)) { throw "Fonte não existe: $srcContent" }
if (!(Test-Path $srcPublic))  { Write-Host "Aviso: fonte não existe: $srcPublic (pulando)"; }

New-Item -ItemType Directory -Force $dstContent | Out-Null
New-Item -ItemType Directory -Force $dstPublic  | Out-Null

# Espelha conteúdo (copia e apaga o que não existe mais na origem)
robocopy $srcContent $dstContent /MIR /NFL /NDL /NJH /NJS /NP | Out-Null

if (Test-Path $srcPublic) {
  robocopy $srcPublic $dstPublic /MIR /NFL /NDL /NJH /NJS /NP | Out-Null
}

Write-Host "OK: sync concluído."
