import { object, string } from "zod";

export const idSchema = object({
  id: string().transform((arg) => {
    return parseInt(arg);
  }),
});

export type IdSchemaType = Zod.infer<typeof idSchema>;
