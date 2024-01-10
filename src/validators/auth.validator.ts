import * as z from "zod";

export const LoginSchema = z.object({
  body: z
    .object({
      email: z
        .string({ required_error: "Email is required" })
        .email("Invalid Email Format"),
      password: z.string({ required_error: "Password is required" }),
    })
    .strict(),
});
