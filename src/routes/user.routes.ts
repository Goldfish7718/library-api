import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  login,
  logout,
} from "../controllers/user.controllers";
import { Router } from "express";
import { ExtendedRequest, verifyToken } from "../middleware/verifyToken";
import { verifyAdmin } from "../middleware/verifyAdmin";

const router = Router();

router.get("/verify", verifyToken, (req: ExtendedRequest, res: any) => {
  const { decode } = req;
  res.status(200).json({ decode });
});

router.get("/", verifyAdmin, getUsers);
router.get("/:id", verifyAdmin, getUser);
router.post("/", createUser);
router.post("/logout", verifyToken, logout);
router.post("/login", login);
router.delete("/:id", verifyToken, deleteUser);

export default router;
