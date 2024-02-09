import { Context } from "hono";
import { ZodError } from "zod";

export type ResultType<T = any> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: ZodError<any>;
      data: T;
    };

export default (result: ResultType, c: Context) => {
  if (!result.success) {
    return c.json({ message: "Invalid!", errors: result.error.format() }, 400);
  }
};
