import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

// if (!process.env.DATABASE_URL) throw new Error("Not found database URL!");

// export const client = createClient({
//   url: process.env.DATABASE_URL,
//   authToken: process.env.DATABASE_AUTH_TOKEN,
// });

export const sqlite = new Database("first-db.db");

export const db = drizzle(sqlite);
