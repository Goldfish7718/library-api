"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Please enter a longer name"),
    description: zod_1.z
        .string()
        .min(5, "Please Enter a longer description")
        .optional(),
});
