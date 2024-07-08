const express = require("express");
const router = express.Router();
const helpCenterController = require("../controllers/helpCenterController");

router.post("/create", helpCenterController.createHelpTicket);
router.get("/list", helpCenterController.getAllTickets);
router.get("/get/:id", helpCenterController.getTicketById);
router.put("/update/:id", helpCenterController.updateTicket);
router.delete("/delete/:id", helpCenterController.deleteTicket);
router.get("/search", helpCenterController.searchTicket);

module.exports = router;
