# export_handoff.ps1
# Gera um ZIP limpo do projeto para compartilhar no Google Drive

$ErrorActionPreference = "Stop"

# Pasta raiz do projeto (onde está este script)
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

# Nome do projeto e timestamp
$projectName = "VIVA_TDAH_HAIDER3"
$timestamp   = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"

# Pasta temporária de staging
$staging = Join-Path $env:TEMP "$projectName_HANDOFF_$timestamp"

# Saída (Desktop)
$outZip = Join-Path ([Environment]::GetFolderPath("Desktop")) "$projectName_HANDOFF_$timestamp.zip"

Write-Host "==> Root:     $root"
Write-Host "==> Staging:  $staging"
Write-Host "==> Output:   $outZip"

# Limpa staging se existir
if (Test-Path $staging) { Remove-Item $staging -Recurse -Force }

New-Item -ItemType Directory -Path $staging | Out-Null

# Pastas para incluir (se existirem)
$includeDirs = @(
  ".astro",
  "public",
  "src",
  "VIVA_TDAH",
  ".vscode"
)

# Arquivos para incluir (se existirem)
$includeFiles = @(
  "astro.config.mjs",
  "package.json",
  "package-lock.json",
  "tsconfig.json",
  ".gitignore",
  ".prettierrc",
  "README.md",
  ".env.example",
  "AUDIT_01_TREE.txt",
  "AUDIT_02_FILES.txt",
  "bootstrap_auditorias_vivatdah.py",
  "bootstrap_docs_vivatdah.py",
  "bootstrap_vivatdah.py",
  "create_tdahblog_design_structure.py",
  "IMPORTAR.py"
)

# Itens/padrões para excluir (em qualquer lugar)
$excludePatterns = @(
  "node_modules",
  ".env",
  ".vercel",
  "dist",
  "build",
  ".astro-cache",
  ".cache",
  ".DS_Store",
  "Thumbs.db",
  "*.log",
  "*.tmp",
  "*.zip"
)

function Should-Exclude($path) {
  foreach ($p in $excludePatterns) {
    if ($path -like "*\$p\*" -or $path -like "*\/$p\*" -or (Split-Path $path -Leaf) -like $p) {
      return $true
    }
  }
  return $false
}

function Copy-DirFiltered($src, $dst) {
  if (!(Test-Path $src)) { return }

  Write-Host "==> Copy dir: $src"

  New-Item -ItemType Directory -Force -Path $dst | Out-Null

  Get-ChildItem -Path $src -Recurse -Force | ForEach-Object {
    $full = $_.FullName

    if (Should-Exclude $full) { return }

    $rel = $full.Substring($src.Length).TrimStart("\","/")
    $target = Join-Path $dst $rel

    if ($_.PSIsContainer) {
      New-Item -ItemType Directory -Force -Path $target | Out-Null
    } else {
      New-Item -ItemType Directory -Force -Path (Split-Path $target -Parent) | Out-Null
      Copy-Item -Force -Path $full -Destination $target
    }
  }
}

# Copia dirs
foreach ($d in $includeDirs) {
  $src = Join-Path $root $d
  $dst = Join-Path $staging $d
  Copy-DirFiltered $src $dst
}

# Copia files soltos
foreach ($f in $includeFiles) {
  $src = Join-Path $root $f
  if (Test-Path $src) {
    Write-Host "==> Copy file: $f"
    Copy-Item -Force -Path $src -Destination (Join-Path $staging $f)
  }
}

# Cria ZIP
if (Test-Path $outZip) { Remove-Item $outZip -Force }

Compress-Archive -Path (Join-Path $staging "*") -DestinationPath $outZip -Force

# Limpa staging
Remove-Item $staging -Recurse -Force

Write-Host "`n✅ ZIP criado com sucesso:"
Write-Host $outZip
