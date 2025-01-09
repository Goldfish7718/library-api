"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSchema = void 0;
const zod_1 = require("zod");
exports.bookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    isbn: zod_1.z
        .string()
        .min(13, "ISBN is required")
        .max(13, "ISBN Should not be more than 13 digits long"),
    copiesAvailable: zod_1.z.number().int().nonnegative(),
    authors: zod_1.z.array(zod_1.z.number()),
    categories: zod_1.z.array(zod_1.z.number()).optional(),
});
