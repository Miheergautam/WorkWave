const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const authenticateEmployee = require("../middleware/authMiddleware");

router.post("/create", employeeController.createEmployee);
router.get("/list", employeeController.listEmployees);
router.get("/get/:id", employeeController.getEmployee);
router.put("/update/:id", employeeController.updateEmployee);
router.delete("/delete/:id", employeeController.deleteEmployee);

module.exports = router;
