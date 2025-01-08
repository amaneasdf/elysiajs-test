import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/db/schema",
  dbCredentials: {
    url: process.env.DB_URL,
  },
});
