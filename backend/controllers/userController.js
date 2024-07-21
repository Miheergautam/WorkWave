const userModel = require("../models/userModel");
const {
  userValidationSchema,
  passwordValidationSchema,
} = require("../middleware/schemaValidator");
const jwt = require("jsonwebtoken");

// User Register
const userRegister = async (req, res) => {
  try {
    const { success, data, error } = userValidationSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: error.errors });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      return res.status(400).json({ message: "User email already exists" });
    }

    // Create a new user
    const user = new userModel(data);
    await user.save();

    // Send response
    res.status(201).json({
      message: `User registered successfully`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//USER SIGNIN

const userSignin = async (req, res) => {
  try {
    const { success, data, error } = userValidationSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the user exists
    const user = await userModel.findOne({ email: data.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isPasswordMatch = await user.comparePassword(data.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Update last login timestamp
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Send response with token
    res.status(200).json({
      message: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//USER UPDATE
const userUpdate = async (req, res) => {
  try {
    const id = req.userId;
    if (!id)
      return res
        .status(400)
        .json({ message: "UnAuthorized , UserId is Required" });

    const { success, data, error } = userValidationSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: error.errors });
    }

    // Check if email is being updated (not allowed)
    if (data.email !== undefined) {
      return res.status(400).json({ message: "Email cannot be updated" });
    }

    // Update the user
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    // Check if user was found and updated
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send response
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//change password
const changePassword = async (req, res) => {
  try {
    const id = req.userId;
    if (!id)
      return res
        .status(400)
        .json({ message: "UnAuthorized , UserId is Required" });

    const { success, data, error } = passwordValidationSchema.safeParse(
      req.body
    );
    if (!success) {
      return res.status(400).json({ message: error.errors });
    }
    // Check if the user exists
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (data.confirmPassword === data.newPassword) {
      // Check if the password is correct
      const isPasswordMatch = await user.comparePassword(data.currentPassword);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid current password" });
      }

      // Update the password
      user.password = data.newPassword;
      await user.save();

      // Send response
      res.status(200).json({
        message: "Password changed successfully",
      });
    } else {
      return res.status(400).json({ message: "Password does not match" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get users
const getUsers = async (req, res) => {
  try {
    const users = await (await userModel.find().select("-password"));
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user by id
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "User ID is required" });

    const user = await userModel.findById(id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        streetAddress: user.streetAddress,
        city: user.city,
        state: user.state,
        country: user.country,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) return res.status(400).json({ message: "User ID is required" });

    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUser = async (req, res) => {
  try {
    const { search: query } = req.query;

    // Validate the search query
    if (!query) {
      return res.status(400).json({ error: "No search query provided" });
    }

    // Construct the search query
    const searchQuery = {
      $or: [
        { firstName: { $regex: new RegExp(query, "i") } },
        { lastName: { $regex: new RegExp(query, "i") } },
        { email: { $regex: new RegExp(query, "i") } },
        { gender: { $regex: new RegExp(query, "i") } },
        { state: { $regex: new RegExp(query, "i") } },
        { role: { $regex: new RegExp(query, "i") } },
      ],
    };

    // Check if the query contains both first and last names
    if (query.includes(" ")) {
      const [firstName, lastName] = query.split(" ");

      // Update search query to match both first and last names together
      searchQuery.$or.push({
        $and: [
          { firstName: { $regex: new RegExp(firstName, "i") } },
          { lastName: { $regex: new RegExp(lastName, "i") } },
        ],
      });
    }

    // Perform search using Mongoose's find method
    const results = await userModel.find(searchQuery).select("-password");

    // Return the search results
    res.status(200).json({
      message: "Searching users successful",
      data: results,
    });
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error occurred during search:", err);

    // Return a 500 status code with a generic error message
    res
      .status(500)
      .json({ success: false, status: 500, message: "Internal Server Error" });
  }
};

module.exports = {
  userRegister,
  userSignin,
  userUpdate,
  changePassword,
  getUsers,
  getUserById,
  deleteUser,
  searchUser,
};
