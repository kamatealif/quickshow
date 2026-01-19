import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // The path must start from the location of this config file
  schema: "./drizzle/src/db/schema.ts", 
  out: "./drizzle/migrations", // or just "./drizzle" if you prefer
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});