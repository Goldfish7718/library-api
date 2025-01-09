import { ZodError } from "zod";
import {
  borrowedBookSchema,
  BorrowedBookType,
} from "../models/borrowedBook.model";
import createController from "../utils/createController";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const getBorrowedBooks = createController(async (req, res) => {
  try {
    const borrowedBooks = await prisma.borrowedBook.findMany();

    res.status(200).json({ borrowedBooks });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export const borrowBook = createController(async (req, res) => {
  try {
    const { borrowedBook }: { borrowedBook: BorrowedBookType } = req.body;
    borrowedBookSchema.parse(borrowedBook);

    const newBorrowedBook = await prisma.borrowedBook.create({
      data: borrowedBook,
    });

    await prisma.book.update({
      where: { id: borrowedBook.bookId },
      data: {
        copiesAvailable: { decrement: 1 },
      },
    });

    res.status(200).json({ newBorrowedBook });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export const returnBook = createController(async (req, res) => {
  try {
    const { borrowedBookId } = req.params;

    await prisma.borrowedBook.delete({
      where: { id: parseInt(borrowedBookId) },
    });

    res.status(200).json({ message: "Book returned succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
