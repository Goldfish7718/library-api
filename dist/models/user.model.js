"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().optional(),
    name: zod_1.z.string().max(50).min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z
        .string()
        .min(8, "Password must be 8 characters long")
        .regex(/^(?=.*[A-Z])(?=.*\d).+$/, "Password must contain atleast 1 uppercase and 1 lowercase"),
    role: zod_1.z.enum(["MEMBER", "ADMIN"]).default("MEMBER"),
    isEmailVerified: zod_1.z.boolean().default(false),
    isActive: zod_1.z.boolean().default(true),
    createdAt: zod_1.z.date().default(() => new Date()),
    updatedAt: zod_1.z.date().optional(),
    deletedAt: zod_1.z.date().nullable().optional(),
});
