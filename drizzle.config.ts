import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db.ts",
  out: "./src/drizzle",
  dialect: "postgresql",
});
