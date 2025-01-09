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
exports.createBook = exports.getBook = exports.getBooks = void 0;
const zod_1 = require("zod");
const book_model_1 = require("../models/book.model");
const createController_1 = __importDefault(require("../utils/createController"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.getBooks = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield prisma.book.findMany({
            include: { authors: true, categories: true },
        });
        res.status(200).json({ books });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.getBook = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { isbn } = req.params;
        const book = yield prisma.book.findUnique({
            where: {
                isbn,
            },
            include: {
                authors: true,
                categories: true,
            },
        });
        res.status(200).json({ book });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.createBook = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { book } = req.body;
        book_model_1.bookSchema.parse(book);
        const transformedBook = Object.assign(Object.assign({}, book), { authors: {
                connect: book.authors.map((author) => ({ id: author })),
            }, categories: {
                connect: (_a = book.categories) === null || _a === void 0 ? void 0 : _a.map((category) => ({ id: category })),
            } });
        const newBook = yield prisma.book.create({
            data: transformedBook,
            include: {
                authors: true,
                categories: true,
            },
        });
        res.status(200).json({ newBook });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}));
