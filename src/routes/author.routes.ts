import { Router } from "express";
import { createAuthor, getAuthors } from "../controllers/author.controllers";
import { verifyAdmin } from "../middleware/verifyAdmin";

const router = Router();

router.get("/", verifyAdmin, getAuthors);
router.post("/", verifyAdmin, createAuthor);

export default router;
