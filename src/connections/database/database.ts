import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

if (!process.env.DATABASE_URL) throw new Error("Not found database URL!");

export const client = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(client);
