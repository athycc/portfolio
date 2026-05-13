// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";
import type { OutputBundle, Plugin } from "vite";

function ensureServerEntryPlugin(): Plugin {
  return {
    name: "ensure-server-entry",
    apply: "build",
    enforce: "post",
    writeBundle(options, bundle: OutputBundle) {
      const outDir = options.dir ? path.resolve(options.dir) : "";
      if (!outDir.endsWith(path.normalize("dist/server"))) {
        return;
      }

      const hasIndex = Object.prototype.hasOwnProperty.call(bundle, "index.js");
      if (!hasIndex) {
        return;
      }

      const shimPath = path.join(outDir, "server.js");
      const relImport = "./index.js";
      fs.writeFileSync(shimPath, `export { default } from "${relImport}";\n`, "utf8");
    },
  };
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// @cloudflare/vite-plugin builds from this — wrangler.jsonc main alone is insufficient.
export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: false,
      pages: [{ path: "/" }],
    },
  },
  vite: {
    plugins: [ensureServerEntryPlugin()],
  },
});
