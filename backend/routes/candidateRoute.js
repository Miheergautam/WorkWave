const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");
const authenticateUser = require("../middleware/authMiddleware");

router.post("/create", candidateController.createCandidate);
router.get("/get", candidateController.getAllCandidates);
router.get("/get/:id", candidateController.getCandidate);
router.put("/update/:id", candidateController.updateCandidate);
router.delete("/delete/:id", candidateController.deleteCandidate);
router.get("/search", candidateController.searchCandidate);

module.exports = router;
