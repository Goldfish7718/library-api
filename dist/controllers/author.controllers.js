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
exports.createAuthor = exports.getAuthors = void 0;
const zod_1 = require("zod");
const author_model_1 = require("../models/author.model");
const createController_1 = __importDefault(require("../utils/createController"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.getAuthors = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authors = yield prisma.author.findMany();
        res.status(200).json({ authors });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.createAuthor = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author } = req.body;
        author_model_1.authorSchema.parse(author);
        const newAuthor = yield prisma.author.create({
            data: author,
        });
        res.status(200).json({ newAuthor });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            res.json({ error });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
