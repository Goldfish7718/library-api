import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  login,
  logout,
} from "../controllers/user.controllers";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.post("/logout", logout);
router.post("/login", login);
router.delete("/:id", deleteUser);

export default router;
