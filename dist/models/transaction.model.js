"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
const zod_1 = require("zod");
exports.transactionSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    borrowedBookId: zod_1.z.number(),
    amountPaid: zod_1.z.number(),
    paymentDate: zod_1.z.date().default(new Date()),
});
