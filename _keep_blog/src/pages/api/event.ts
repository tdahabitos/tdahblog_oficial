// src/pages/api/event.ts
import type { APIRoute } from "astro";
import { createHash, randomUUID } from "node:crypto";
import { supabaseServer } from "../../lib/supabase";

function sha256(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

function getVisitorHash(cookies: any) {
  const salt = (import.meta.env.VISITOR_SALT as string) || "salt";
  let vid = cookies.get("vh")?.value as string | undefined;

  if (!vid) {
    vid = randomUUID();
    cookies.set("vh", vid, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 24 * 365,
    });
  }

  return sha256(`${vid}:${salt}`);
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const payload = await request.json().catch(() => null);
  const event_name = (payload?.name as string | undefined)?.trim();

  if (!event_name) return new Response(null, { status: 204 });

  const visitor_hash = getVisitorHash(cookies);

  await supabaseServer.from("events").insert({
    event_name,
    path: payload?.path ?? null,
    referrer: payload?.referrer ?? null,
    visitor_hash,
    payload: payload?.data ?? null,
  });

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "content-type": "application/json" },
  });
};