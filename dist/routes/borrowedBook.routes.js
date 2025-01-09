"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrowedBook_controllers_1 = require("../controllers/borrowedBook.controllers");
const router = (0, express_1.Router)();
router.post("/", borrowedBook_controllers_1.borrowBook);
exports.default = router;
