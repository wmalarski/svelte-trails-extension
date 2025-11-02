import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { defineConfig } from "vite";
import zipPack from "vite-plugin-zip-pack";
import { manifestPlugin } from "./src/build/manifest-plugin";

// https://vite.dev/config/
export default defineConfig(() => {
  const isProduction = process.env.BUILD_MODE === "production";
  return {
    build: {
      sourcemap: !isProduction,
      target: "esnext",
    },
    plugins: [
      svelte(),
      tailwindcss(),
      manifestPlugin(),
      isProduction ? zipPack({ outFileName: "svelte-trails.zip" }) : undefined,
    ],
    resolve: {
      alias: {
        $lib: path.resolve("./src/lib"),
      },
    },
  };
});
