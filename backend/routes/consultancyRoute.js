const express = require("express");
const router = express.Router();
const consultancyController = require("../controllers/consultancyController");

router.post("/create", consultancyController.createConsultancy);
router.get("/list", consultancyController.listConsultancies);
router.get("/get/:id", consultancyController.getConsultancyById);
router.put("/update/:id", consultancyController.updateConsultancy);
router.delete("/delete/:id", consultancyController.deleteConsultancy);

module.exports = router;
  