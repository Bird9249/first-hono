import { eq } from "drizzle-orm";
import { db } from "src/shared/connections/database/database";
import { InsertUser, User } from "src/shared/connections/database/type-schema";
import { profiles, users } from "../../shared/connections/database/schema";

export async function queryUser(): Promise<User[]> {
  const response = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      created_at: users.created_at,
      updated_at: users.updated_at,
      profile: {
        first_name: profiles.first_name,
        last_name: profiles.first_name,
        user_id: profiles.user_id,
      },
    })
    .from(users)
    .leftJoin(profiles, eq(users.id, profiles.user_id))
    .execute();

  return response;
}

export async function insertUser(user: InsertUser): Promise<void> {
  await db.transaction(async (tx) => {
    try {
      const res = await tx.insert(users).values(user).returning();

      if (user.profile) {
        await tx
          .insert(profiles)
          .values({ ...user.profile, user_id: res[0].id })
          .execute();
      }
    } catch (error) {
      tx.rollback();

      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  });
}

export async function queryUserById(id: number): Promise<User> {
  const response = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      created_at: users.created_at,
      updated_at: users.updated_at,
      profile: {
        first_name: profiles.first_name,
        last_name: profiles.first_name,
        user_id: profiles.user_id,
      },
    })
    .from(users)
    .leftJoin(profiles, eq(users.id, profiles.user_id))
    .where(eq(users.id, id))
    .execute();

  return response[0];
}

export async function updateUser(
  id: number,
  insert: InsertUser
): Promise<void> {
  await db.transaction(async (tx) => {
    try {
      const res = await tx
        .update(users)
        .set({ name: insert.name, email: insert.email })
        .where(eq(users.id, id))
        .returning();

      if (insert.profile) {
        await tx
          .update(profiles)
          .set(insert.profile)
          .where(eq(profiles.user_id, res[0].id))
          .execute();
      }
    } catch (error) {
      tx.rollback();

      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  });
}

export async function deleteUserQuery(id: number): Promise<void> {
  try {
    await db.delete(users).where(eq(users.id, id)).execute();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
