import type { UserConfig } from "vite";
import { MT_WEBSITE_URL } from "../lib/integrations/map/constants";

export const manifestPlugin = (): NonNullable<UserConfig["plugins"]>[0] => {
  return {
    generateBundle(_options) {
      const manifest = {
        description: "",
        host_permissions: [
          `https://${MT_WEBSITE_URL}/*`,
          `http://${MT_WEBSITE_URL}/*`,
        ],
        icons: {
          "16": "images/16x16.png",
          "32": "images/32x32.png",
          "48": "images/48x48.png",
          "128": "images/128x128.png",
        },
        manifest_version: 3,
        name: "Svelte Trails Extension",
        permissions: ["sidePanel", "activeTab", "storage", "scripting"],
        side_panel: {
          default_path: "index.html",
        },
        version: "1.0",
      };

      this.emitFile({
        fileName: "manifest.json",
        source: JSON.stringify(manifest, null, 2),
        type: "asset",
      });
    },
    name: "chrome-extension-manifest-plugin",
  };
};
