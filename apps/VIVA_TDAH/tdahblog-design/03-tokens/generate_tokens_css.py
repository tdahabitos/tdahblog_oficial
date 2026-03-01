from __future__ import annotations

from pathlib import Path
import re
import sys
from typing import Any

TOKENS_YAML = Path("tdahblog-design/03-tokens/tokens.yaml")
OUT_CSS = Path("tdahblog-design/03-tokens/tokens.css")


def normalize_css_var(name: str) -> str:
    return re.sub(r"[^a-zA-Z0-9\-_]", "-", name.replace(".", "-"))


def flatten(prefix: str, obj: Any, out: dict[str, Any]) -> None:
    if isinstance(obj, dict):
        for k, v in obj.items():
            new_prefix = f"{prefix}.{k}" if prefix else str(k)
            flatten(new_prefix, v, out)
        return
    if isinstance(obj, list):
        out[prefix] = obj
        return
    out[prefix] = obj


def get_by_path(data: dict, path: str) -> Any:
    cur: Any = data
    for part in path.split("."):
        if not isinstance(cur, dict):
            raise KeyError(path)

        # 1) tenta como string
        if part in cur:
            cur = cur[part]
            continue

        # 2) se for número, tenta como int (caso das escalas 50/100/200...)
        if part.isdigit():
            ip = int(part)
            if ip in cur:
                cur = cur[ip]
                continue

        raise KeyError(path)

    return cur


REF_RE = re.compile(r"^\{([a-zA-Z0-9_.-]+)\}$")


def resolve_refs(data: dict) -> dict:
    # Resolve referências do tipo "{color.primitives.neutral.100}"
    def _resolve(node: Any) -> Any:
        if isinstance(node, dict):
            return {k: _resolve(v) for k, v in node.items()}
        if isinstance(node, list):
            return [_resolve(x) for x in node]
        if isinstance(node, str):
            m = REF_RE.match(node.strip())
            if m:
                ref_path = m.group(1)
                val = get_by_path(data, ref_path)
                return _resolve(val)
        return node

    return _resolve(data)


def main() -> int:
    try:
        import yaml  # type: ignore
    except Exception:
        print("❌ PyYAML não está instalado. Instale com:", file=sys.stderr)
        print("   python -m pip install pyyaml", file=sys.stderr)
        return 1

    if not TOKENS_YAML.exists():
        print(f"❌ Não achei {TOKENS_YAML}. Rode na raiz VIVA_TDAH.", file=sys.stderr)
        return 1

    raw = yaml.safe_load(TOKENS_YAML.read_text(encoding="utf-8"))
    if not isinstance(raw, dict):
        print("❌ tokens.yaml precisa ser um dict no topo.", file=sys.stderr)
        return 1

    resolved = resolve_refs(raw)

    flat: dict[str, Any] = {}
    flatten("", resolved, flat)

    lines: list[str] = []
    lines.append("/* Auto-generated from tokens.yaml (resolved) */")
    lines.append(":root {")

    for key in sorted(flat.keys()):
        css_name = normalize_css_var(key)
        val = flat[key]

        # listas (sombras) → string com vírgula
        if isinstance(val, list):
            val_str = ", ".join(str(x) for x in val)
        else:
            val_str = str(val)

        lines.append(f"  --{css_name}: {val_str};")
    
        # -------------------------------------------------
    # Short aliases for frontend ergonomics
    # -------------------------------------------------

    alias_map = {
        # surfaces
        "color.semantic.surface.0": "color.surface.0",
        "color.semantic.surface.1": "color.surface.1",
        "color.semantic.surface.2": "color.surface.2",
        "color.semantic.surface.3": "color.surface.3",

        # text
        "color.semantic.text.primary": "color.text.primary",
        "color.semantic.text.secondary": "color.text.secondary",
        "color.semantic.text.muted": "color.text.muted",
        "color.semantic.text.inverse": "color.text.inverse",

        # brand
        "color.semantic.brand.primary": "color.brand.primary",
        "color.semantic.brand.secondary": "color.brand.secondary",
        "color.semantic.brand.soft": "color.brand.soft",
        "color.semantic.brand.whisper": "color.brand.whisper",

        # border
        "color.semantic.border.subtle": "color.border.subtle",
        "color.semantic.border.default": "color.border.default",
        "color.semantic.border.strong": "color.border.strong",
        "color.semantic.border.focus": "color.border.focus",

        # states
        "color.semantic.state.hoverBg": "color.state.hoverBg",
        "color.semantic.state.activeBg": "color.state.activeBg",
        "color.semantic.state.disabledBg": "color.state.disabledBg",
        "color.semantic.state.disabledText": "color.state.disabledText",

        # typography
        "typography.fontFamily.editorial": "font.editorial",
        "typography.fontFamily.ui": "font.ui",

        "typography.fontSize.h1": "text.h1",
        "typography.fontSize.h2": "text.h2",
        "typography.fontSize.h3": "text.h3",
        "typography.fontSize.body": "text.body",
        "typography.fontSize.small": "text.small",

        "typography.lineHeight.body": "text.lineHeight.body",
        "typography.lineHeight.heading": "text.lineHeight.heading",

        # layout
        "layout.readingWidth": "layout.readingWidth",
        "layout.containerMax": "layout.containerMax",

        # motion
        "motion.duration.fast": "motion.fast",
        "motion.duration.base": "motion.base",
        "motion.duration.slow": "motion.slow",
    }

    for src, dst in alias_map.items():
        src_css = normalize_css_var(src)
        dst_css = normalize_css_var(dst)
        lines.append(f"  --{dst_css}: var(--{src_css});")


    lines.append("}")
    lines.append("")

    # Placeholder de dark mode (você pode substituir depois por tokens dark reais)
    lines.append('[data-theme="dark"] {')
    lines.append("  /* placeholder: sobrescreva tokens aqui */")
    lines.append("}")
    lines.append("")

    OUT_CSS.write_text("\n".join(lines), encoding="utf-8")
    print(f"✅ Gerado: {OUT_CSS}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
