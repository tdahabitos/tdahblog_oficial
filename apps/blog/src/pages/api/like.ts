import type { APIRoute } from "astro";
import { supabaseServer } from "../../lib/supabase";
import { createHash } from "node:crypto";

// Route: /api/like

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function visitorId(req: Request) {
  const xf = req.headers.get("x-forwarded-for") || "";
  const ip = xf.split(",")[0]?.trim() || "local";
  const ua = req.headers.get("user-agent") || "unknown";
  return createHash("sha256").update(ip + "|" + ua).digest("hex");
}

async function countLikes(slug: string) {
  const { count, error } = await supabaseServer
    .from("post_likes")
    .select("*", { count: "exact", head: true })
    .eq("slug", slug);

  if (error) throw error;
  return count ?? 0;
}

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get("slug")?.trim();
  if (!slug) return json({ error: "missing_slug" }, 400);

  try {
    const count = await countLikes(slug);
    return json({ slug, count });
  } catch (e: any) {
    return json({ error: e?.message ?? "like_count_failed" }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  let body: any = null;
  try { body = await request.json(); } catch {}

  const slug = String(body?.slug ?? "").trim();
  if (!slug) return json({ error: "missing_slug" }, 400);

  const vid = visitorId(request);

  // toggle: se existe, remove; senão, cria
  const { data: existing, error: selErr } = await supabaseServer
    .from("post_likes")
    .select("slug, visitor_id")
    .eq("slug", slug)
    .eq("visitor_id", vid)
    .maybeSingle();

  if (selErr) return json({ error: selErr.message }, 500);

  let liked = false;

  if (existing) {
    const { error: delErr } = await supabaseServer
      .from("post_likes")
      .delete()
      .eq("slug", slug)
      .eq("visitor_id", vid);

    if (delErr) return json({ error: delErr.message }, 500);
    liked = false;
  } else {
    const { error: insErr } = await supabaseServer
      .from("post_likes")
      .insert({ slug, visitor_id: vid });

    if (insErr) return json({ error: insErr.message }, 500);
    liked = true;
  }

  try {
    const count = await countLikes(slug);
    return json({ ok: true, slug, liked, count });
  } catch (e: any) {
    return json({ ok: true, slug, liked, count: null, warn: e?.message ?? "count_failed" });
  }
};
