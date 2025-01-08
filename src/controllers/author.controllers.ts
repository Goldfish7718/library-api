import { ZodError } from "zod";
import { AuthorSchemaType, authorSchema } from "../models/author.model";
import createController from "../utils/createController";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAuthors = createController(async (req, res) => {
  try {
    const authors = await prisma.author.findMany();

    res.status(200).json({ authors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const createAuthor = createController(async (req, res) => {
  try {
    const { author } = req.body;

    authorSchema.parse(author);

    const newAuthor = await prisma.author.create({
      data: author,
    });

    res.status(200).json({ newAuthor });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      res.json({ error });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});
