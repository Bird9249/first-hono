import { createInsertSchema } from "drizzle-zod";
import { profiles, users } from "src/shared/connections/database/schema";
import { string } from "zod";

const insertProfileSchema = createInsertSchema(profiles);

export const insertUserSchema = createInsertSchema(users, {
  email: string().email(),
}).extend({
  profile: insertProfileSchema,
});
