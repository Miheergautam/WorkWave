const expenseModel = require("../models/expenseModel");
const { expenseValidationSchema } = require("../middleware/schemaValidator");

// Add an expense
const addExpense = async (req, res) => {
  try {
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

    const newExpense = new expenseModel(data);
    await newExpense.save();

    res.status(201).json({ message: "Expense added successfully" });
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

const searchTicket = async (req, res) => {
  try {
    const { search: query } = req.query;

    // Validate the search query
    if (!query) {
      return res.status(400).json({ error: "No search query provided" });
    }

    // Construct the search query
    const searchQuery = {
      $or: [
        { expenseId: { $regex: query, $options: "i" } },
        { userId: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { dateOfExpense: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ],
    };

    // Perform search using Mongoose's find method
    const results = await expenseModel.find(searchQuery);

    // Return the search results
    res.status(200).json({
      message: "Searching Tickets successful",
      data: results,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error occurred during search:", err);

    // Return a 500 status code with a generic error message
    res
      .status(500)
      .json({ success: false, status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  searchTicket,
};
