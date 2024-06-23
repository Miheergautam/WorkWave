const express = require("express");
const router = express.Router();
const userRoute = require("./user.Route");
const adminRoute = require("./adminRoute");
const employeeRoute = require("./employeeRoute");


router.use("/user", userRoute);
router.use("/admin", adminRoute);
router.use("/employee", employeeRoute);

module.exports = router;
