import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ["./src/drizzle/*.sql"],
  plugins: [TanStackRouterVite({}), react()],
  optimizeDeps: { exclude: ["@electric-sql/pglite"] },
});
