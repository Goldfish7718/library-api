import { z } from "zod";

const sevenDaysFromNow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
};

export const borrowedBookSchema = z.object({
  userId: z.number(),
  bookId: z.number(),
  borrowDate: z.date().default(new Date()),
  returnDate: z.date().default(() => sevenDaysFromNow()),
  fineamount: z.number().default(0),
});

export type BorrowedBookType = z.infer<typeof borrowedBookSchema>;
