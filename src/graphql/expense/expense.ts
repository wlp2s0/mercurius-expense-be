import { Schema, model } from "mongoose";
import { ObjectId } from "mongoose";

export interface IExpense {
  id: string;
  amount: number;
  description: string;
  userId: ObjectId;
  receiptDate: Date;
}

const expenseSchema = new Schema<IExpense>({
  amount: { type: Number, required: true, default: 0 },
  description: { type: String },
  userId: { type: Schema.Types.ObjectId },
  receiptDate: Date,
});

export const ExpenseModel = model<IExpense>("Expense", expenseSchema);
