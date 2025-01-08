"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const author_controllers_1 = require("../controllers/author.controllers");
const router = (0, express_1.Router)();
router.get("/", author_controllers_1.getAuthors);
router.post("/", author_controllers_1.createAuthor);
exports.default = router;
