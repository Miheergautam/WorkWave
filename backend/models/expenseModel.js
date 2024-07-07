const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./userModel");

const ExpensesSchema = new Schema(
  {
    expenseId: { type: String, required: true, unique: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true },
    description: { type: String },
    dateOfExpense: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Pending", "approved", "rejected"],
      default: "Pending",
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  (timestamp = true)
);

const Expense = mongoose.model("Expense", ExpensesSchema);

module.exports = Expense;
