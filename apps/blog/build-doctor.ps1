param([int]$MaxPass = 25)

function OK($m){ Write-Host "✅ $m" -ForegroundColor Green }
function WARN($m){ Write-Host "⚠️  $m" -ForegroundColor Yellow }
function FAIL($m){ Write-Host "❌ $m" -ForegroundColor Red }

$Root = (Get-Location).Path
function AbsPath([string]$p){
  $p = $p -replace '/', '\'
  if ([System.IO.Path]::IsPathRooted($p)) { return $p }
  return Join-Path $Root $p
}
function ReadText([string]$p){
  if (!(Test-Path -LiteralPath $p)) { return "" }
  return Get-Content -LiteralPath $p -Raw -ErrorAction SilentlyContinue
}
function WriteText([string]$p, [string]$txt){
  $dir = Split-Path $p -Parent
  if ($dir -and !(Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  Set-Content -LiteralPath $p -Value $txt -Encoding UTF8
}
function AppendIfMissing([string]$p, [string]$needleRegex, [string]$append){
  $txt = ReadText $p
  if ($txt -match $needleRegex) { return $false }
  WriteText $p ($txt + "`r`n`r`n" + $append + "`r`n")
  return $true
}
function RelPath([string]$fromDir, [string]$toFile){
  $rel = [System.IO.Path]::GetRelativePath($fromDir, $toFile)
  $rel = $rel -replace '\\','/'
  if ($rel -notmatch '^\.' ) { $rel = "./" + $rel }
  return $rel
}
function PatchImport([string]$importerAbs, [string]$oldSpec, [string]$newSpec){
  $txt = ReadText $importerAbs
  if (!$txt) { return $false }
  $pattern = "from\s+['""]" + [regex]::Escape($oldSpec) + "['""]"
  if ($txt -notmatch $pattern) { return $false }
  $newTxt = [regex]::Replace($txt, $pattern, ('from "' + $newSpec + '"'))
  if ($newTxt -ne $txt) { WriteText $importerAbs $newTxt; return $true }
  return $false
}

# --------- pré-fixes seguros ---------

# 1) rss duplicado (se existir .js e .ts)
$rssJs = ".\src\pages\rss.xml.js"
$rssTs = ".\src\pages\rss.xml.ts"
if (Test-Path $rssJs -and Test-Path $rssTs) {
  Rename-Item -Force $rssJs ($rssJs + ".bak") -ErrorAction SilentlyContinue
  OK "Renomeei rss.xml.js -> rss.xml.js.bak (evita colisão)"
}

# 2) content folder (tirar warning chato)
if (!(Test-Path ".\src\content\blog")) {
  New-Item -ItemType Directory -Force ".\src\content\blog" | Out-Null
  OK "Criei src/content/blog (para remover warning do glob-loader)"
}

# 3) lazy-image placeholder (se faltar)
$lazy = ".\src\components\lazy-image.astro"
if (!(Test-Path $lazy)) {
  WriteText $lazy @"
---
export interface Props {
  src: string;
  alt?: string;
  width?: string | number;
  height?: string | number;
  class?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
}
const {
  src,
  alt = "",
  width,
  height,
  class: klass = "",
  loading = "lazy",
  decoding = "async",
} = Astro.props as Props;
---
<img src={src} alt={alt} width={width} height={height} class={klass} loading={loading} decoding={decoding} />
"@
  OK "Criei placeholder: src/components/lazy-image.astro"
}

# --------- loop de correção ---------

function FixMissingExport([string]$symbol, [string]$moduleRel){
  $modAbs = AbsPath $moduleRel
  if (!(Test-Path -LiteralPath $modAbs)) {
    $stub = @"
// AUTO-GENERATED: módulo criado para destravar build
export const $symbol = (..._args: any[]) => {
  throw new Error('TODO: implement $symbol');
};
"@
    WriteText $modAbs $stub
    OK "Criei módulo + export stub: $moduleRel -> $symbol"
    return $true
  }

  $txt = ReadText $modAbs

  # já existe export real?
  $exportRegex = "(?m)export\s+(async\s+function|function|const|let|var|class|type|interface)\s+$([regex]::Escape($symbol))\b"
  if ($txt -match $exportRegex) {
    WARN "Export já existe no arquivo, mas Vite não enxerga como valor: $symbol em $moduleRel (vou criar stub como value)"
  }

  # já existe stub como value?
  $valueRegex = "(?m)export\s+(async\s+function|function|const|let|var|class)\s+$([regex]::Escape($symbol))\b"
  if ($txt -match $valueRegex) { return $false }

  $append = @"
// AUTO-FIX: export faltando para destravar build
export const $symbol = (..._args: any[]) => {
  throw new Error('TODO: implement $symbol');
};
"@
  WriteText $modAbs ($txt + "`r`n`r`n" + $append)
  OK "Adicionei export stub: $symbol em $moduleRel"
  return $true
}

function FixCouldNotResolve([string]$importSpec, [string]$importerRel){
  $importerAbs = AbsPath $importerRel
  if (!(Test-Path -LiteralPath $importerAbs)) { return $false }

  $importerDir = Split-Path $importerAbs -Parent

  # tenta achar arquivo real pelo nome
  $leaf = ($importSpec -replace '/', '\')
  $leafName = Split-Path $leaf -Leaf
  $base = [System.IO.Path]::GetFileNameWithoutExtension($leafName)

  $cands = Get-ChildItem -Recurse -File ".\src" -ErrorAction SilentlyContinue |
    Where-Object { $_.BaseName -ieq $base -or $_.Name -ieq $leafName }

  if ($cands.Count -gt 0) {
    # preferir .astro, depois .ts/.tsx
    $best = $cands | Sort-Object @{
      Expression = { if ($_.Extension -ieq ".astro") {0} elseif ($_.Extension -ieq ".ts" -or $_.Extension -ieq ".tsx") {1} else {2} }
    }, FullName | Select-Object -First 1

    $rel = RelPath $importerDir $best.FullName
    $changed = PatchImport $importerAbs $importSpec $rel
    if ($changed) { OK "Import corrigido (case/path): $importerRel :: $importSpec -> $rel"; return $true }
    return $false
  }

  # se não achou, cria placeholder no caminho resolvido
  $resolvedBase = Join-Path $importerDir ($importSpec -replace '/', '\')
  $hasExt = [System.IO.Path]::GetExtension($resolvedBase)
  $ext = $hasExt
  if (!$ext) {
    if ($importSpec -match "components|layouts") { $ext = ".astro" } else { $ext = ".ts" }
  }
  $target = if ($hasExt) { $resolvedBase } else { $resolvedBase + $ext }

  if (!(Test-Path -LiteralPath $target)) {
    $dir = Split-Path $target -Parent
    if (!(Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }

    if ($target -match "\\src\\(components|layouts)\\") {
      WriteText $target @"
---
/** AUTO-GENERATED placeholder para destravar build */
---
<div style="display:none"></div>
<slot />
"@
    } else {
      WriteText $target @"
// AUTO-GENERATED placeholder para destravar build
export default {};
"@
    }

    OK "Criei placeholder: $([System.IO.Path]::GetRelativePath($Root,$target))"
    return $true
  }

  return $false
}

for ($i=1; $i -le $MaxPass; $i++) {
  Write-Host "`n=== BUILD PASS $i/$MaxPass ===" -ForegroundColor Cyan
  $out = cmd /c "pnpm build" 2>&1
  $text = ($out | Out-String)

  if ($LASTEXITCODE -eq 0) {
    OK "BUILD OK 🎉"
    exit 0
  }

  # 1) missing export
  if ($text -match '"([^"]+)"\s+is not exported by "([^"]+)"') {
    $sym = $Matches[1]
    $mod = $Matches[2]
    if (FixMissingExport $sym $mod) { continue }
  }

  # 2) could not resolve
  if ($text -match 'Could not resolve "([^"]+)" from "([^"]+)"') {
    $spec = $Matches[1]
    $imp  = $Matches[2]
    if (FixCouldNotResolve $spec $imp) { continue }
  }

  # nada reconhecido
  FAIL "Build falhou com um erro que eu não consigo auto-corrigir com segurança."
  Write-Host "`n--- Últimas 40 linhas ---`n" -ForegroundColor Yellow
  $out | Select-Object -Last 40 | ForEach-Object { Write-Host $_ }
  exit 1
}
FAIL "Cheguei no limite de tentativas ($MaxPass). Ainda tem erro."
exit 1
