"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowedBook = void 0;
const zod_1 = require("zod");
exports.borrowedBook = zod_1.z.object({
    userId: zod_1.z.number(),
    bookId: zod_1.z.number(),
    borrowDate: zod_1.z.date().default(new Date()),
    returnDate: zod_1.z.date(),
    fineamount: zod_1.z.number().default(0),
});
