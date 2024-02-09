import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import formatValidation from "src/shared/utils/hooks/format-validation";
import { idSchema } from "src/shared/validations/id.schema";
import {
  deleteUserQuery,
  insertUser,
  queryUser,
  queryUserById,
  updateUser,
} from "./repository/user.repository";
import { insertUserSchema } from "./validations/user.validation";

const userRouter = new Hono();

userRouter
  .get("/", async ({ json }) => {
    const user = await queryUser();

    return json(user, 200);
  })

  .post(
    "/",
    zValidator("json", insertUserSchema, formatValidation),
    async ({ req, json }) => {
      const body = req.valid("json");

      await insertUser(body);

      return json({ message: "success" }, 201);
    }
  )

  .get(
    "/:id",
    zValidator("param", idSchema, formatValidation),
    async ({ req, json }) => {
      const param = req.valid("param");

      const result = await queryUserById(param.id);

      return json(result, 200);
    }
  )

  .put(
    "/:id",
    zValidator("param", idSchema, formatValidation),
    zValidator("json", insertUserSchema, formatValidation),
    async ({ req, json }) => {
      const { id } = req.valid("param");
      const body = req.valid("json");

      await updateUser(id, body);

      return json({ message: "success" }, 200);
    }
  )

  .delete(
    "/:id",
    zValidator("param", idSchema, formatValidation),
    async ({ req, json }) => {
      const { id } = req.valid("param");

      await deleteUserQuery(id);

      return json({ message: "success" }, 200);
    }
  );

export default userRouter;
