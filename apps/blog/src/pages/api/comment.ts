import type { APIRoute } from "astro";
import { supabaseServer } from "../../lib/supabase";

// Route: /api/comment

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get("slug")?.trim();
  if (!slug) return json({ error: "missing_slug" }, 400);

  const { data, error } = await supabaseServer
    .from("post_comments")
    .select("id, slug, name, body, created_at")
    .eq("slug", slug)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return json({ error: error.message }, 500);
  return json({ slug, items: data ?? [] });
};

export const POST: APIRoute = async ({ request }) => {
  let body: any = null;
  try { body = await request.json(); } catch {}

  const slug = String(body?.slug ?? "").trim();
  const name = String(body?.name ?? "").trim();
  const text = String(body?.body ?? "").trim();

  if (!slug) return json({ error: "missing_slug" }, 400);
  if (!name || name.length < 2) return json({ error: "invalid_name" }, 400);
  if (!text || text.length < 3) return json({ error: "invalid_body" }, 400);

  // limites simples anti-spam
  if (name.length > 60) return json({ error: "name_too_long" }, 400);
  if (text.length > 1200) return json({ error: "body_too_long" }, 400);

  const { data, error } = await supabaseServer
    .from("post_comments")
    .insert({ slug, name, body: text })
    .select("id, slug, name, body, created_at")
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ ok: true, item: data });
};
