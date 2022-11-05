import mdx from "@astrojs/mdx";
import prefetch from "@astrojs/prefetch";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), prefetch(), tailwind()],
});
