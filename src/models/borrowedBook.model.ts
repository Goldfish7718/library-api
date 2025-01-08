import { z } from "zod";

export const borrowedBook = z.object({
  userId: z.number(),
  bookId: z.number(),
  borrowDate: z.date().default(new Date()),
  returnDate: z.date(),
  fineamount: z.number().default(0),
});

export type BorrowedBookType = z.infer<typeof borrowedBook>;
