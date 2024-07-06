const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/create", adminController.createAdmin);

router.get("/getAll", adminController.getAdmins);
router.put("/update/:id", adminController.updateAdmin);
router.delete("/delete/:id", adminController.deleteAdmin);

module.exports = router;
