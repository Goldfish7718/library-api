import { z } from "zod";

export const userSchema = z.object({
  id: z.number().optional(),
  name: z.string().max(50).min(3),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be 8 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain atleast 1 uppercase and 1 lowercase"
    ),
  role: z.enum(["MEMBER", "ADMIN"]).default("MEMBER"),
  isEmailVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
  deletedAt: z.date().nullable().optional(),
});

export type UserSchemaType = z.infer<typeof userSchema>;
