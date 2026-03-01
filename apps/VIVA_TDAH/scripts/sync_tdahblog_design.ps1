$ErrorActionPreference = "Stop"

$srcTokens = "tdahblog-design/03-tokens"
$srcComponents = "tdahblog-design/04-components"

$dst = "public/assets/tdahblog"
New-Item -ItemType Directory -Force -Path $dst | Out-Null

Copy-Item "$srcTokens/tokens.css" "$dst/tokens.css" -Force
Copy-Item "$srcTokens/tokens.dark.css" "$dst/tokens.dark.css" -Force

Copy-Item "$srcComponents/prose.css" "$dst/prose.css" -Force
Copy-Item "$srcComponents/toc.css" "$dst/toc.css" -Force -ErrorAction SilentlyContinue

Write-Host "✅ Synced TDAH.blog design assets to $dst"
