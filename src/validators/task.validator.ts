import * as z from "zod";
export const TaskCreateSchema = z.object({
  body: z
    .object({
      title: z.string({ required_error: "Name is required" }),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      description: z.string({ required_error: "Description is required" }),
      userId: z.string().optional(),
    })
    .strict(),
});

export const TaskUpdateSchema = z.object({
  body: z
    .object({
      title: z.string({ required_error: "Name is required" }).optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      status: z.string().optional(),
      description: z
        .string({ required_error: "Description is required" })
        .optional(),
      userId: z.string().optional(),
    })
    .strict(),
});
