import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { defineConfig } from "vite";
import { manifestPlugin } from "./src/build/manifest-plugin";

// https://vite.dev/config/
export default defineConfig({
  build: {
    rolldownOptions: {
      input: [
        "index.html",
        "src/scripting/background.ts",
        "src/scripting/content.ts",
      ],
    },
    sourcemap: true,
    target: "esnext",
  },
  plugins: [svelte(), tailwindcss(), manifestPlugin()],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
});
