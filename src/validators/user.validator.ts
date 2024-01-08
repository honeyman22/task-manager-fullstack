import * as z from "zod";

export const UserCreateSchema = z.object({
  body: z
    .object({
      name: z.string({ required_error: "Name is required" }),
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid Email Format"),
      password: z.string({ required_error: "Password is required" }),
    })
    .strict(),
});

export type UserCreateInputType = z.infer<typeof UserCreateSchema>["body"];
