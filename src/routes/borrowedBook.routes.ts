import { Router } from "express";
import { borrowBook } from "../controllers/borrowedBook.controllers";

const router = Router();

router.post("/", borrowBook);

export default router;
