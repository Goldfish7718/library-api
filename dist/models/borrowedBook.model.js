"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowedBookSchema = void 0;
const zod_1 = require("zod");
const sevenDaysFromNow = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date;
};
exports.borrowedBookSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    bookId: zod_1.z.number(),
    borrowDate: zod_1.z.date().default(new Date()),
    returnDate: zod_1.z.date().default(() => sevenDaysFromNow()),
    fineamount: zod_1.z.number().default(0),
});
