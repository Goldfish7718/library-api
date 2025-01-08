"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const zod_1 = require("zod");
exports.BookSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Title is required"),
    isbn: zod_1.z.string().min(1, "ISBN is required"),
    copiesAvailable: zod_1.z.number().int().nonnegative(),
    authors: zod_1.z.array(zod_1.z.number()),
});
