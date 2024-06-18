const express = require('express');
const router = express.Router();
const adminRoute = require('./adminRoute');

router.use("/admin", adminRoute);


module.exports = router;