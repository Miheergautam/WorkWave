const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware");

router.post("/register", userController.userRegister);
router.post("/signin", userController.userSignin);
router.put("/update", authenticateUser, userController.userUpdate); // Ensure authenticateUser is a valid middleware
router.put("/changePassword", authenticateUser, userController.changePassword);
router.get("/list", userController.getUsers);
router.get("/get/:id", userController.getUserById);
router.delete("/delete/:id", userController.deleteUser);
router.get("/search", userController.searchUser);

module.exports = router;
