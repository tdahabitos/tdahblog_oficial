// apps/blog/astro.config.mjs
// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://tdah.blog",
  output: "server",
  adapter: vercel(),
  integrations: [react(), sitemap()],
});
