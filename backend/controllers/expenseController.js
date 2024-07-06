const expenseModel = require("../models/expenseModel");
const { expenseValidationSchema } = require("../middleware/schemaValidator");

// Add an expense
const addExpense = async (req, res) => {
  try {
    req.body.dateOfExpense = new Date(req.body.dateOfExpense);
    const { success, data, error } = expenseValidationSchema.safeParse(
      req.body
    );

    if (!success) {
      return res
        .status(400)
        .json({ message: "Validation error", details: error });
    }

    const newExpense = new expenseModel(data);
    await newExpense.save();

    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (err) {
    console.error("Error adding expense:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all expenses

const getExpenses = async (req, res) => {
  try {
    const expenses = await expenseModel.find();
    res.status(200).json({
      message: "Expenses fetched successfully",
      data: expenses,
    });
  } catch (err) {
    console.error("Error getting expenses:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get an expense by ID
const getExpenseById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const expense = await expenseModel.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({
      message: "Expense fetched successfully",
      data: expense,
    });
  } catch (err) {
    console.error("Error getting expense by ID:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update an expense by ID
const updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }
    if (req.body.dateOfExpense) {
      req.body.dateOfExpense = new Date(req.body.dateOfExpense);
    }

    const { success, data, error } = expenseValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res
        .status(400)
        .json({ message: "Validation error", details: error });
    }

    const updatedExpense = await expenseModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({
      message: "Expense updated successfully",
    });
  } catch (err) {
    console.error("Error updating expense:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete an expense by ID
const deleteExpense = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    const deletedExpense = await expenseModel.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error("Error deleting expense:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
};
