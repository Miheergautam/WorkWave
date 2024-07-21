const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("./userModel");

const ExpensesSchema = new Schema(
  {
    expenseId: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    expenseAmount: { type: Number, required: true },
    purpose: { type: String },
    description: { type: String },
    dateOfExpense: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  },
  (timestamp = true)
);

const Expense = mongoose.model("Expense", ExpensesSchema);

module.exports = Expense;
