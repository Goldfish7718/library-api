import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(3, "Author name must be atleast 6 characters"),
  bio: z.string().min(3, "Please Enter a longer Bio"),
});

export type AuthorSchemaType = z.infer<typeof authorSchema>;
