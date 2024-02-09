import { Hono } from "hono";
import userRouter from "./users/user.router";

const app = new Hono().basePath("/api");

// app.use(async (c, next) => {
//   console.log("middleware 1 start");
//   await next();
//   console.log("middleware 1 end");
// });

app.route("/users", userRouter);

export default app;
