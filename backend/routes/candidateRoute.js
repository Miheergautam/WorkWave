const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

router.post("/create", candidateController.createCandidate);
router.get("/list", candidateController.getAllCandidates);
router.get("/get/:id", candidateController.getCandidate);
router.put("/update/:id", candidateController.updateCandidate);
router.delete("/delete/:id", candidateController.deleteCandidate);

module.exports = router;