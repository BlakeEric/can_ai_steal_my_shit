import { defineConfig } from "astro/config";
import lit from "@astrojs/lit";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";

import expressiveCode from "astro-expressive-code";

// https://astro.build/config
export default defineConfig({
  site: "https://canaistealmyshit.com/",
  integrations: [lit(), sitemap(), expressiveCode()],
  output: "hybrid",
  adapter: vercel()
});