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
exports.logout = exports.deleteUser = exports.login = exports.createUser = exports.getUsers = void 0;
const createController_1 = __importDefault(require("../utils/createController"));
const user_model_1 = require("../models/user.model");
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const generateToken_1 = __importDefault(require("../services/generateToken"));
const prisma = new client_1.PrismaClient();
exports.getUsers = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.status(200).json({ users });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error" });
    }
}));
exports.createUser = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user } = req.body;
        user_model_1.userSchema.parse(user);
        const potentialUser = yield prisma.user.findUnique({
            where: { email: user.email },
        });
        if (potentialUser) {
            return res.status(200).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(user.password, 10);
        user = Object.assign(Object.assign({}, user), { password: hashedPassword });
        const newUser = yield prisma.user.create({
            data: user,
        });
        const { id, name, email, isEmailVerified, role, isActive } = newUser;
        const payload = {
            id,
            name,
            email,
            isEmailVerified,
            role,
            isActive,
        };
        const token = (0, generateToken_1.default)(payload);
        res
            .status(200)
            .cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: false,
            sameSite: "none",
        })
            .json({ newUser });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            res.json({ error });
        }
        res.json({ message: "Internal Server Error" });
    }
}));
exports.login = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user } = req.body;
        const partialUserSchema = user_model_1.userSchema.pick({
            email: true,
        });
        partialUserSchema.parse(user);
        const potentialUser = yield prisma.user.findUnique({
            where: { email: user.email },
        });
        if (!potentialUser) {
            return res.status(200).json({ message: "User not found" });
        }
        const match = yield bcryptjs_1.default.compare(user.password, potentialUser.password);
        if (!match) {
            return res.status(400).json({ message: "Incorrect Credentials" });
        }
        const { id, name, email, isEmailVerified, role, isActive } = potentialUser;
        const payload = {
            id,
            name,
            email,
            isEmailVerified,
            role,
            isActive,
        };
        const token = (0, generateToken_1.default)(payload);
        res
            .status(200)
            .cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: false,
            sameSite: "none",
        })
            .json({ potentialUser });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            res.json({ error });
        }
        res.json({ message: "Internal Server Error" });
    }
}));
exports.deleteUser = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.user.delete({
            where: {
                id: parseInt(id),
            },
        });
        res.status(200).json({ message: "User deleted succesfully" });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error" });
    }
}));
exports.logout = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token").json({ message: "Logged out" });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error" });
    }
}));
