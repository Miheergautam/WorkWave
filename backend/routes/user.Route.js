const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware");

router.post("/register", userController.userRegister);
router.post("/signin", userController.userSignin);
router.put("/update", authenticateUser, userController.userUpdate); // Ensure authenticateUser is a valid middleware
router.put("/changePassword", authenticateUser, userController.changePassword);
router.get("/list", userController.getUsers);
router.get("/get", userController.getUserById);
router.delete("/delete", userController.deleteUser);

module.exports = router;
