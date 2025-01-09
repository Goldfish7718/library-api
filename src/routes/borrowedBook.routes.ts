import { Router } from "express";
import {
  borrowBook,
  getBorrowedBooks,
  returnBook,
} from "../controllers/borrowedBook.controllers";

const router = Router();

router.get("/", getBorrowedBooks);
router.post("/", borrowBook);
router.delete("/:borrowedBookId", returnBook);

export default router;
