import {
  booleanArg,
  list,
  nonNull,
  nullable,
  queryField,
  stringArg,
} from "nexus";
import { ExpenseModel } from "./expense";
import { Expense } from "./types";

export const readExpense = queryField("readExpense", {
  type: nullable(Expense),
  description: "Return an expense",
  args: {
    id: stringArg({ description: "The expense ID" }),
  },
  
  resolve: async (_root, { id }, _context) => {
    const user = await ExpenseModel.findById(id);
    return user;
  },
});

export const readExpenses = queryField("readExpenses", {
  type: nullable(list(Expense)),
  description: "Return all expenses",
  resolve: async () => {
    const expenses = await ExpenseModel.find();
    return expenses;
  },
});
