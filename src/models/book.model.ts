import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isbn: z
    .string()
    .min(13, "ISBN is required")
    .max(13, "ISBN Should not be more than 13 digits long"),
  copiesAvailable: z.number().int().nonnegative(),
  authors: z.array(z.number()),
});

export type BookSchemaType = z.infer<typeof bookSchema>;
