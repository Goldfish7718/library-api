import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(3, "Please enter a longer name"),
  description: z
    .string()
    .min(5, "Please Enter a longer description")
    .optional(),
});

export type CategoryTypeSchema = z.infer<typeof categorySchema>;
