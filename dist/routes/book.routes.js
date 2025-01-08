"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controllers_1 = require("../controllers/book.controllers");
const router = (0, express_1.Router)();
router.get("/", book_controllers_1.getBooks);
router.get("/:isbn", book_controllers_1.getBook);
router.post("/", book_controllers_1.createBook);
exports.default = router;
