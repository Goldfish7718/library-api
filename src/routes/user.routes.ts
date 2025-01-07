import {
  createUser,
  deleteUser,
  getUsers,
  login,
  logout,
} from "../controllers/user.controllers";
import { Router } from "express";

const router = Router();

router.get("/", getUsers);
router.post("/", createUser);
router.post("/logout", logout);
router.post("/login", login);
router.delete("/:id", deleteUser);

export default router;
