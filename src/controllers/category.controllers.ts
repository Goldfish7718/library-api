import { ZodError } from "zod";
import { categorySchema, CategoryTypeSchema } from "../models/category.model";
import createController from "../utils/createController";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCategory = createController(async (req, res) => {
  try {
    const { category }: { category: CategoryTypeSchema } = req.body;

    categorySchema.parse(category);

    const newCategory = await prisma.category.create({
      data: category,
    });

    res.status(200).json({ newCategory });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});
