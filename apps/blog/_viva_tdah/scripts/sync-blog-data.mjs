import fs from "node:fs";
import path from "node:path";

function ensureDir(p) { fs.mkdirSync(p, { recursive: true }); }

function listAllFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
    if (!fs.existsSync(cur)) continue;
    const entries = fs.readdirSync(cur, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(cur, e.name);
      if (e.isDirectory()) stack.push(full);
      else if (e.isFile()) out.push(full);
    }
  }
  return out;
}

function shouldSkip(rel) {
  const parts = rel.split(path.sep);
  return (
    parts.includes("node_modules") ||
    parts.includes(".git") ||
    parts.includes(".vercel") ||
    parts.includes("dist") ||
    parts.includes(".astro")
  );
}

function mergeCopy(src, dst) {
  if (!fs.existsSync(src)) {
    console.log("SKIP:", src, "(não existe)");
    return;
  }
  ensureDir(dst);

  const srcFiles = listAllFiles(src)
    .map((f) => path.normalize(f))
    .filter((f) => !shouldSkip(path.relative(src, f)));

  for (const f of srcFiles) {
    const rel = path.relative(src, f);
    const out = path.join(dst, rel);
    ensureDir(path.dirname(out));
    fs.copyFileSync(f, out);
  }

  console.log("OK:", src, "->", dst, `(${srcFiles.length} arquivos)`);
}

const repoRoot = process.cwd(); // apps/blog

const srcRoot = path.join(repoRoot, "_viva_tdah");
const dstContent = path.join(repoRoot, "src", "content");
const dstPublic  = path.join(repoRoot, "public");

console.log("=== Sync _viva_tdah -> blog (MERGE, sem apagar) ===");
mergeCopy(path.join(srcRoot, "content"), dstContent);
mergeCopy(path.join(srcRoot, "public"),  dstPublic);
console.log("DONE.");
