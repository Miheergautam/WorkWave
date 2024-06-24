const express = require("express");
const router = express.Router();
const userRoute = require("./user.Route");
const adminRoute = require("./adminRoute");
const employeeRoute = require("./employeeRoute");
const candidateRoute = require("./candidateRoute");


router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/employee", employeeRoute);
router.use("/candidate", candidateRoute);

module.exports = router;
