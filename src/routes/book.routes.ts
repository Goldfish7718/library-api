import { Router } from "express";
import { createBook, getBook, getBooks } from "../controllers/book.controllers";
import { verifyAdmin } from "../middleware/verifyAdmin";

const router = Router();

router.get("/", verifyAdmin, getBooks);
router.get("/:isbn", verifyAdmin, getBook);
router.post("/", verifyAdmin, createBook);

export default router;
