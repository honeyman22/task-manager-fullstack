import * as z from "zod";
export const TaskCreateSchema = z.object({
  body: z
    .object({
      title: z.string({ required_error: "Name is required" }),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      description: z.string({ required_error: "Description is required" }),
      userId: z.string({ required_error: "User is required" }),
    })
    .strict(),
});

export const TaskUpdateSchema = z.object({
  body: z
    .object({
      title: z.string({ required_error: "Name is required" }).optional(),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      description: z
        .string({ required_error: "Description is required" })
        .optional(),
      userId: z.string({ required_error: "User is required" }).optional(),
    })
    .strict(),
});
