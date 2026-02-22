// src/lib/supabase.ts
import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.SUPABASE_URL as string | undefined;
const anon = import.meta.env.SUPABASE_ANON_KEY as string | undefined;
const service = import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;

if (!url) throw new Error("SUPABASE_URL não configurada");
if (!anon && !service) throw new Error("SUPABASE_ANON_KEY ou SUPABASE_SERVICE_ROLE_KEY não configurada");

export const supabaseServer = createClient(url, service ?? anon!, {
  auth: { persistSession: false },
});