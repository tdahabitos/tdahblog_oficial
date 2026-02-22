import { slugify } from "./slugify";

export type TocItem = { id: string; text: string; level: 2 | 3 };

function stripTags(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export function buildTocFromHtml(html: string) {
  const seen = new Map<string, number>();
  const toc: TocItem[] = [];

  const out = html.replace(
    /<h([2-3])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (full, lvlRaw, attrsRaw, innerRaw) => {
      const level = Number(lvlRaw) as 2 | 3;
      const attrs = String(attrsRaw ?? "");
      const inner = String(innerRaw ?? "");
      const text = stripTags(inner);

      const idMatch = attrs.match(/\sid\s*=\s*["']([^"']+)["']/i);
      let id = idMatch?.[1];

      if (!id) {
        const base = slugify(text || `sec-${toc.length + 1}`);
        const count = (seen.get(base) ?? 0) + 1;
        seen.set(base, count);
        id = count === 1 ? base : `${base}-${count}`;

        toc.push({ id, text, level });
        return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
      }

      toc.push({ id, text, level });
      return full;
    }
  );

  return { html: out, toc };
}