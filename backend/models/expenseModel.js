const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const ExpensesSchema = new Schema(
  {
    expenseId: { type: String, default: uuidv4(), unique: true },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
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
