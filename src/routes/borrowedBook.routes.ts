import { Router } from "express";
import {
  borrowBook,
  getBorrowedBooks,
  returnBook,
} from "../controllers/borrowedBook.controllers";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyToken, getBorrowedBooks);
router.post("/", verifyToken, borrowBook);
router.delete("/:borrowedBookId", verifyToken, returnBook);

export default router;
