import type { Config } from "drizzle-kit";

export default {
  schema: "./src/connections/database/schema.ts",
  driver: "turso",
  dbCredentials: {
    url: <string>process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
