import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { manifestPlugin } from "./src/build/manifest-plugin";

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    target: "esnext",
  },
  plugins: [svelte(), manifestPlugin()],
});
