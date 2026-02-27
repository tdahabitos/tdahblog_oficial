# Variáveis de ambiente — Inventário (Mapa de integrações)

## 1) Lista consolidada por variável (A–Z)

- API_URL
  - Categoria: Indefinido
  - Ocorrências:
    - E:\Viva_Tdah_Haider3\apps\blog\src\consts.ts:4
          3: export const SITE_IMAGE_PLACEHOLDER = '/og-placeholder.jpg'
          4: export const API_URL = import.meta.env.API_URL

- BASE_URL
  - Categoria: Indefinido
  - Ocorrências:
    - E:\Viva_Tdah_Haider3\apps\blog\src\components\HeaderLink.astro:7
          6: const { href, class: className, ...props } = Astro.props;
          7: const pathname = Astro.url.pathname.replace(import.meta.env.BASE_URL, '');

- PROD
  - Categoria: Indefinido
  - Ocorrências:
    - E:\Viva_Tdah_Haider3\apps\blog\src\pages\api\event.ts:20
         19:       sameSite: "lax",
         20:       secure: import.meta.env.PROD,

- STORAGE_URL
  - Categoria: Indefinido
  - Ocorrências:
    - E:\Viva_Tdah_Haider3\apps\blog\src\consts.ts:5
          4: export const API_URL = import.meta.env.API_URL
          5: export const STORAGE_URL = import.meta.env.STORAGE_URL

- SUPABASE_ANON_KEY
  - Categoria: Supabase
  - Ocorrências:
    - E:\Viva_Tdah_Haider3\apps\blog\src\lib\supabase.ts:5
          4: const url = import.meta.env.SUPABASE_URL as string | undefined;
          5: const anon = import.meta.env.SUPABASE_ANON_KEY as string | undefined;
    - E:\Viva_Tdah_Haider3\apps\blog\src\lib\supabase.ts:9
          8: if (!url) throw new Error("SUPABASE_URL nÃ£o configurada");
          9: if (!anon && !service) throw new Error("SUPABASE_ANON_KEY ou SUPABASE_SERVICE_ROLE_KEY nÃ£o configurada");

- SUPABASE_SERVICE_ROLE_KEY
  - Categoria: Supabase
  - Ocorrências:
    - E:\Viva_Tdah_Haider3\apps\blog\src\lib\supabase.ts:6
          5: const anon = import.meta.env.SUPABASE_ANON_KEY as string | undefined;
          6: const service = import.meta.env.SUPABASE_SERVICE_ROLE_KEY as string | undefined;
    - E:\Viva_Tdah_Haider3\apps\blog\src\lib\supabase.ts:9
          8: if (!url) throw new Error("SUPABASE_URL nÃ£o configurada");
          9: if (!anon && !service) throw new Error("SUPABASE_ANON_KEY ou SUPABASE_SERVICE_ROLE_KEY nÃ£o configurada");

- SUPABASE_URL
  - Categoria: Supabase
  - Ocorrências:
    - E:\Viva_Tdah_Haider3\apps\blog\src\lib\supabase.ts:4
          3: 
          4: const url = import.meta.env.SUPABASE_URL as string | undefined;
    - E:\Viva_Tdah_Haider3\apps\blog\src\lib\supabase.ts:8
          7: 
          8: if (!url) throw new Error("SUPABASE_URL nÃ£o configurada");

- VISITOR_SALT
  - Categoria: Indefinido
  - Ocorrências:
    - E:\Viva_Tdah_Haider3\apps\blog\src\pages\api\event.ts:11
         10: function getVisitorHash(cookies: any) {
         11:   const salt = (import.meta.env.VISITOR_SALT as string) || "salt";
