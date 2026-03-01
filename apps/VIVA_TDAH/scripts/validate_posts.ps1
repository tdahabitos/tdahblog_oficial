Write-Host "📄 Validação em lote de posts VivaTDAH"

$posts = Get-ChildItem content/posts -Filter *.md -Recurse -ErrorAction SilentlyContinue

foreach ($post in $posts) {
  Write-Host "➡️ Validando $($post.Name)"
  pwsh ./scripts/validate_post_v2.ps1 -PostPath $post.FullName
}

Write-Host "✅ Todos os posts passaram na validação."
