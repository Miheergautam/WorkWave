const express = require("express");
const adminController = require("../controllers/adminController");
const router = express.Router();

router.post("/create", adminController.createAdmin);
router.get("/list", adminController.listAdmins);
router.put("/edit/:id", adminController.editAdmin);
router.delete("/delete/:id", adminController.deleteAdmin);

module.exports = router;
