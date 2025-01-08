import { z } from "zod";

export const transactionSchema = z.object({
  userId: z.number(),
  borrowedBookId: z.number(),
  amountPaid: z.number(),
  paymentDate: z.date().default(new Date()),
});

export type TransactionSchemaType = z.infer<typeof transactionSchema>;
