import { Hono } from "hono";
import { createUser, deleteUser, getById, getUser, update } from "./user/user";

const app = new Hono().basePath("/api");

app.use(async (c, next) => {
  console.log("middleware 1 start");
  await next();
  console.log("middleware 1 end");
});

app
  .get("/", ({ json }) => {
    const user = getUser();

    return json(user, 200);
  })
  .post("/", async ({ req, json }) => {
    const body = await req.json();
    const result = createUser(body);

    return json(result, 201);
  })
  .get("/:id", ({ req, json }) => {
    const { id } = req.param();
    const result = getById(Number(id));

    return json(result, 200);
  })
  .put("/:id", async ({ req, json }) => {
    const { id } = req.param();
    const body = await req.json();
    const result = update(Number(id), body);

    return json(result, 200);
  })
  .delete("/:id", ({ req, json }) => {
    const { id } = req.param();
    const result = deleteUser(Number(id));

    return json(result, 200);
  });

export default app;
