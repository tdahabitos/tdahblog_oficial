import fs from "node:fs";
import path from "node:path";

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyFileSync(src, dst) {
  ensureDir(path.dirname(dst));
  fs.copyFileSync(src, dst);
}

function listAllFiles(dir) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const cur = stack.pop();
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

function mirrorDir(src, dst) {
  if (!fs.existsSync(src)) {
    console.log("SKIP:", src, "(não existe)");
    return;
  }
  ensureDir(dst);

  const srcFiles = listAllFiles(src)
    .map((f) => path.normalize(f))
    .filter((f) => {
      const rel = path.relative(src, f);
      return !shouldSkip(rel);
    });

  // Copy/update
  const dstSeen = new Set();
  for (const f of srcFiles) {
    const rel = path.relative(src, f);
    const out = path.join(dst, rel);
    dstSeen.add(path.normalize(out));
    copyFileSync(f, out);
  }

  // Delete files that no longer exist in src
  const dstFiles = fs.existsSync(dst) ? listAllFiles(dst).map((f) => path.normalize(f)) : [];
  for (const f of dstFiles) {
    const rel = path.relative(dst, f);
    if (shouldSkip(rel)) continue;
    if (!dstSeen.has(f)) {
      fs.unlinkSync(f);
    }
  }

  console.log("OK:", src, "->", dst, `(${srcFiles.length} arquivos)`);
}

const repoRoot = process.cwd();

const srcRoot = path.join(repoRoot, "VIVA_TDAH");
const dstFull = path.join(repoRoot, "apps", "blog", "_viva_tdah");

const srcContent = path.join(srcRoot, "content");
const dstContent = path.join(repoRoot, "apps", "blog", "src", "content");

const srcPublic = path.join(srcRoot, "public");
const dstPublic = path.join(repoRoot, "apps", "blog", "public");

console.log("=== Sync FULL VIVA_TDAH (não público) ===");
mirrorDir(srcRoot, dstFull);

console.log("=== Sync BLOG content/public ===");
mirrorDir(srcContent, dstContent);
mirrorDir(srcPublic, dstPublic);

console.log("DONE.");
