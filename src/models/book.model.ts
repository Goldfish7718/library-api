import { z } from "zod";

export const BookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  isbn: z.string().min(1, "ISBN is required"),
  copiesAvailable: z.number().int().nonnegative(),
  authors: z.array(z.number()),
});

export type BookSchemaType = z.infer<typeof BookSchema>;
