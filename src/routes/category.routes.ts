import { Router } from "express";
import { createCategory } from "../controllers/category.controllers";
import { verifyAdmin } from "../middleware/verifyAdmin";

const router = Router();

router.post("/", verifyAdmin, createCategory);

export default router;
