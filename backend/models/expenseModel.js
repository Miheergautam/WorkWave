const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExpensesSchema = new Schema({
  purpose: {
    type: String,
    required: true,
    trim: true,
  },
  billUrl: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  voucherUrl: {
    type: String,
  },
  remark: {
    type: String,
    trim: true,
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "cheque", "credit card", "bank transfer"],
    required: true,
  },
  cashReceivedBy: {
    type: String,
    trim: true,
  },
  dateOfExpense: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ExpensesSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Expense = mongoose.model("Expense", ExpensesSchema);

module.exports = Expense;
