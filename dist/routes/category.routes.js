"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controllers_1 = require("../controllers/category.controllers");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const router = (0, express_1.Router)();
router.post("/", verifyAdmin_1.verifyAdmin, category_controllers_1.createCategory);
exports.default = router;
