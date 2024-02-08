import { migrate } from "drizzle-orm/bun-sqlite/migrator";
// import { migrate } from "drizzle-orm/libsql/migrator";
import { db, sqlite } from "./database";

migrate(db, { migrationsFolder: "./drizzle" });

sqlite.close();
