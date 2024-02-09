import { profiles, users } from "./schema";

export type User = typeof users.$inferSelect & {
  profile: typeof profiles.$inferSelect | null;
};
export type InsertUser = typeof users.$inferInsert & {
  profile: typeof profiles.$inferInsert | null;
};
  