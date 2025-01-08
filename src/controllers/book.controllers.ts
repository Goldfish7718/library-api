import { ZodError } from "zod";
import { bookSchema, BookSchemaType } from "../models/book.model";
import createController from "../utils/createController";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBooks = createController(async (req, res) => {
  try {
    const books = await prisma.book.findMany({ include: { authors: true } });

    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getBook = createController(async (req, res) => {
  try {
    const { isbn } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        isbn,
      },
      include: {
        authors: true,
      },
    });

    res.status(200).json({ book });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

export const createBook = createController(async (req, res) => {
  try {
    const { book }: { book: BookSchemaType } = req.body;
    bookSchema.parse(book);

    const transformedBook = {
      ...book,
      authors: {
        connect: book.authors.map((author) => ({ id: author })),
      },
    };

    const newBook = await prisma.book.create({
      data: transformedBook,
      include: {
        authors: true,
      },
    });

    res.status(200).json({ newBook });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      res.json({ error });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});
