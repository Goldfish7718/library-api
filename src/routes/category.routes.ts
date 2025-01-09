import { Router } from "express";
import { createCategory } from "../controllers/category.controllers";

const router = Router();

router.post("/", createCategory);

export default router;
