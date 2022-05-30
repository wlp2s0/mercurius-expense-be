import { interfaceType, list, objectType } from "nexus";
import { ExpenseModel } from "./expense";

export const Expense = objectType({
  name: "Expense",
  description: "A simple expense object",
  definition(t) {
    t.nonNull.id("id");
    t.int("amount", { description: "The expense amount" });
    t.string("description", { description: "The expense description" });
    t.field("receiptDate", {
      type: "DateTime",
      description: "ISO date",
    });
  },
});

export const Node = interfaceType({
  name: "Node",
  resolveType: () => null,
  definition(t) {
    t.id("id");
  },
});

export const User = objectType({
  name: "User",
  definition(t) {
    t.implements(Node);

    t.list.field("expenses", {
      type: Expense,
      resolve: async function ({ id: userId }) {
        const expenses = await ExpenseModel.find({ userId });
        return expenses;
      },
    });
  },
});
