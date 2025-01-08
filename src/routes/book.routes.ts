import { Router } from "express";
import { createBook, getBook, getBooks } from "../controllers/book.controllers";

const router = Router();

router.get("/", getBooks);
router.get("/:isbn", getBook);
router.post("/", createBook);

export default router;
