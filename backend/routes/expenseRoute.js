const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/add", expenseController.addExpense);
router.get("/list", expenseController.getExpenses);
router.get("/get/:id", expenseController.getExpenseById);
router.put("/update/:id", expenseController.updateExpense);
router.delete("/delete/:id", expenseController.deleteExpense);
router.get("/search", expenseController.searchTicket);

module.exports = router;
