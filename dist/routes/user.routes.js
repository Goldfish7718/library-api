"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_controllers_1 = require("../controllers/user.controllers");
const express_1 = require("express");
const verifyToken_1 = require("../middleware/verifyToken");
const verifyAdmin_1 = require("../middleware/verifyAdmin");
const router = (0, express_1.Router)();
router.get("/verify", verifyToken_1.verifyToken, (req, res) => {
    const { decode } = req;
    res.status(200).json({ decode });
});
router.get("/", verifyAdmin_1.verifyAdmin, user_controllers_1.getUsers);
router.get("/:id", verifyAdmin_1.verifyAdmin, user_controllers_1.getUser);
router.post("/", user_controllers_1.createUser);
router.post("/logout", verifyToken_1.verifyToken, user_controllers_1.logout);
router.post("/login", user_controllers_1.login);
router.delete("/:id", verifyToken_1.verifyToken, user_controllers_1.deleteUser);
exports.default = router;
