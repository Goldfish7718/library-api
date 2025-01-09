"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowBook = exports.prisma = void 0;
const zod_1 = require("zod");
const borrowedBook_model_1 = require("../models/borrowedBook.model");
const createController_1 = __importDefault(require("../utils/createController"));
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
exports.borrowBook = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { borrowedBook } = req.body;
        borrowedBook_model_1.borrowedBookSchema.parse(borrowedBook);
        const newBorrowedBook = yield exports.prisma.borrowedBook.create({
            data: borrowedBook,
        });
        yield exports.prisma.book.update({
            where: { id: borrowedBook.bookId },
            data: {
                copiesAvailable: { decrement: 1 },
            },
        });
        res.status(200).json({ newBorrowedBook });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}));
