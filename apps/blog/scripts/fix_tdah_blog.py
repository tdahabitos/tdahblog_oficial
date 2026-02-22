from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]  # raiz do repo
SRC = ROOT / "src"

REPLACEMENTS = [
    (r"layouts/base-layout\.astro", "layouts/BaseLayout.astro"),
]

REQUIRED_FILES = [
    ROOT / "src" / "layouts" / "BaseLayout.astro",
    ROOT / "src" / "components" / "head.astro",
]

def replace_in_file(path: Path):
    text = path.read_text(encoding="utf-8")
    original = text

    for pattern, repl in REPLACEMENTS:
        text = re.sub(pattern, repl, text)

    if text != original:
        path.write_text(text, encoding="utf-8")
        print(f"[FIX] {path.relative_to(ROOT)}")

def scan_and_fix():
    astro_files = list(SRC.rglob("*.astro"))
    for f in astro_files:
        replace_in_file(f)

def sanity_checks():
    ok = True
    for f in REQUIRED_FILES:
        if not f.exists():
            print(f"[MISSING] {f.relative_to(ROOT)}")
            ok = False

    # checar assets
    assets = ROOT / "public" / "assets" / "tdahblog"
    needed_assets = ["tokens.css", "tokens.dark.css", "global.css", "prose.css"]
    for a in needed_assets:
        if not (assets / a).exists():
            print(f"[MISSING] public/assets/tdahblog/{a}")
            ok = False

    return ok

def main():
    print("== VivaTDAH Blog Fix ==")
    scan_and_fix()
    ok = sanity_checks()

    # confirmar que não sobrou import antigo
    leftovers = []
    for f in (SRC / "pages").rglob("*.astro"):
        t = f.read_text(encoding="utf-8")
        if "layouts/base-layout.astro" in t:
            leftovers.append(f.relative_to(ROOT))

    if leftovers:
        print("[WARN] Ainda sobrou 'base-layout.astro' em:")
        for x in leftovers:
            print(" -", x)
        ok = False

    print("== DONE ==")
    if not ok:
        print("Alguns itens ainda precisam ajuste manual. Veja [MISSING]/[WARN].")
    else:
        print("Tudo ok. Rode: npm run dev")

if __name__ == "__main__":
    main()
