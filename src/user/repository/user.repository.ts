import { eq } from "drizzle-orm";
import { db } from "src/connections/database/database";
import { InsertUser, User, users } from "./schema";

export async function queryUser(): Promise<User[]> {
  const response = await db.select().from(users).execute();

  return response;
}

export async function insertUser(user: InsertUser): Promise<void> {
  try {
    await db.insert(users).values(user).execute();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function queryUserById(id: number): Promise<User> {
  const response = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .execute();

  return response[0];
}

export async function updateUser(
  id: number,
  insert: InsertUser
): Promise<void> {
  try {
    await db.update(users).set(insert).where(eq(users.id, id)).execute();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
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
