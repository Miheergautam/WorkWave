const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  userValidationSchema,
  passwordValidatorSchema,
} = require("../middleware/schemaValidator");
const jwt = require("jsonwebtoken");

// User Signup
const userSignup = async (req, res) => {
  const { success, data, error } = userValidationSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: error.errors });
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create a new user
    const user = new userModel({
      ...data,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send response
    res.status(201).json({
      message: "User created successfully",
      userId: user._id,
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//USER SIGNIN

const userSignin = async (req, res) => {
  const { success, data, error } = userValidationSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: error.errors });
  }

  try {
    // Check if the user exists
    const user = await userModel.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });

      // Send response
      res.status(200).json({
        message: "User logged in successfully",
        userId: user._id,
        token: token,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//USER UPDATE
const userUpdate = async (req, res) => {
  const id = req.userId;
  console.log(id);
  if (!id)
    return res
      .status(400)
      .json({ message: "UnAuthorized , UserId is Required" });

  const { success, data, error } = userValidationSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: error.errors });
  }

  try {
    // Check if email is being updated (not allowed)
    if (data.email !== undefined) {
      return res.status(400).json({ message: "Email cannot be updated" });
    }

    // Check if 'password' field is present
    if (data.password !== undefined) {
      return res
        .status(400)
        .json({ message: "Password cannot be updated through this endpoint" });
    }

    // Update the user
    const updatedUser = await userModel.findByIdAndUpdate(
      id, // Assuming `id` is correctly passed and represents the user to update
      { $set: data },
      { new: true, runValidators: true }
    );

    // Check if user was found and updated
    if (updatedUser) {
      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//change password
const changePassword = async (req, res) => {
  const id = req.userId;
  if (!id)
    return res
      .status(400)
      .json({ message: "UnAuthorized , UserId is Required" });

  const { success, data, error } = passwordValidatorSchema.safeParse(req.body);
  if (!success) {
    return res.status(400).json({ message: error.errors });
  }

  try {
    // Check if the user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      data.currentPassword,
      user.password
    );

    if (passwordMatch) {
      if (data.confirmPassword === data.newPassword) {
        const hashedPassword = await bcrypt.hash(data.newPassword, 10);
        const updatedUser = await userModel.findByIdAndUpdate(
          id,
          { $set: { password: hashedPassword } },
          { new: true, runValidators: true }
        );

        if (updatedUser) {
          return res
            .status(200)
            .json({ message: "Password updated successfully" });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get users
const getUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({
      users: users.map((user) => {
        return {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          dateOfBirth: user.date,
        };
      }),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user by id
const getUserById = async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ message: "User ID is required" });

  try {
    const user = await userModel.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).json({ message: "User ID is required" });

  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  userSignup,
  userSignin,
  userUpdate,
  changePassword,
  getUsers,
  getUserById,
  deleteUser,
};
