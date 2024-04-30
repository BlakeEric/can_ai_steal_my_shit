import { defineConfig } from "astro/config";
import lit from "@astrojs/lit";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import expressiveCode from "astro-expressive-code";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://www.canaistealmyshit.com/",
  integrations: [
    lit(),
    sitemap({
      filter: (page) => page !== "https://www.canaistealmyshit.com/analysis/",
    }),
    expressiveCode(),
    preact(),
  ],
  output: "hybrid",
  adapter: vercel(),
});
