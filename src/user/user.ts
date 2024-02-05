export interface User {
  id: number;
  name: string;
}

const user: User[] = [];

export function getUser() {
  return user;
}

export function createUser(input: User) {
  user.push(input);

  return "success";
}

export function getById(id: number) {
  return user.find((val) => val.id === id);
}

export function update(id: number, input: User) {
  const idx = user.findIndex((val) => val.id === id);

  user[idx] = input;

  return "success";
}

export function deleteUser(id: number) {
  const idx = user.findIndex((val) => val.id === id);

  user.splice(idx, 1);

  return "success";
}
