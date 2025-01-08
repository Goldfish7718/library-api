"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorSchema = void 0;
const zod_1 = require("zod");
exports.authorSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, "Author name must be atleast 6 characters"),
    bio: zod_1.z.string().min(3, "Please Enter a longer Bio"),
});
