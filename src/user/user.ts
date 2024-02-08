import { InsertUser } from "./repository/schema";
import {
  deleteUserQuery,
  insertUser,
  queryUser,
  queryUserById,
  updateUser,
} from "./repository/user.repository";

export async function getUser() {
  return await queryUser();
}

export async function createUser(input: InsertUser) {
  await insertUser(input);

  return "success";
}

export async function getById(id: number) {
  return await queryUserById(id);
}

export async function update(id: number, input: InsertUser) {
  await updateUser(id, input);

  return "success";
}

export async function deleteUser(id: number) {
  await deleteUserQuery(id);

  return "success";
}
