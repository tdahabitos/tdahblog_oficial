export function saveProgress(slug) {
  localStorage.setItem("lastPost", slug)
}

export function getProgress() {
  return localStorage.getItem("lastPost")
}
<script>
import { saveProgress } from "../lib/progress"
saveProgress("{Astro.url.pathname}")
</script>
const last = localStorage.getItem("lastPost")