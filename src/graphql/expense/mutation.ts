import {
  arg,
  intArg,
  mutationField,
  nonNull,
  nullable,
  stringArg,
} from "nexus";
import { ExpenseModel } from "./expense";
import { Expense } from "./types";
import path from "path";
import fs from "fs";
import { pipeline } from "node:stream/promises";

export const createExpense = mutationField("createExpense", {
  type: nonNull(Expense),
  description: "Create a new expense",
  args: {
    amount: intArg({ description: "The expense amount" }),
    description: nonNull(stringArg({ description: "The expense descriprion" })),
    userId: nonNull(arg({ type: "ObjectID", description: "The user id" })),
    receiptImage: arg({ type: "Upload" }),
    receiptDate: arg({ type: "DateTime" }),
  },
  resolve: async (
    _root,
    { amount, description, userId, receiptImage, receiptDate }
  ) => {
    const { filename, createReadStream } = await receiptImage;
    const rs = createReadStream();

    const ws = fs.createWriteStream(path.join("./static", filename));
    await pipeline(rs, ws);
    const expense = new ExpenseModel({
      amount,
      description,
      userId,
      receiptDate,
    });
    await expense.save();
    return expense;
  },
});
