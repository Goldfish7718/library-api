"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// PACKAGE IMPORTS
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = require("dotenv");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, dotenv_1.config)();
// ROUTE IMPORTS
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
// CONFIG
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// MIDDLEWARE
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
// ROUTES
app.use("/users", user_routes_1.default);
app.use("/book", book_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`);
});
