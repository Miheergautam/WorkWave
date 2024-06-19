const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const { adminValidationSchema } = require("../middleware/schemaValidator");

const createAdmin = async (req, res) => {
  const { success, data, error } = adminValidationSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({ errors: error.errors });
  }

  try {
    // Check if admin with the same email already exists
    const existingAdmin = await adminModel.findOne({ email: data.email });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists with email: " + data.email });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Create a new admin instance
    const newAdmin = new adminModel({
      ...data,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// List all admins
const listAdmins = async (req, res) => {
  try {
    // Fetch all admins, excluding the password field
    const admins = await adminModel.find({}, "-password");

    // Respond with list of admins
    res.status(200).json(admins);
  } catch (error) {
    // Handle server errors
    console.error("Error listing admins:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const editAdmin = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Admin ID is required" });

  const { success, data, error } = adminValidationSchema.safeParse(req.body);
  if (!success) return res.status(400).json({ errors: error.errors });

  try {
    // Check if email is being updated (not allowed)
    if (data.email !== undefined) {
      return res.status(400).json({ message: "Email cannot be updated" });
    }

    // Hash the password if provided
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 12);
    }

    // Update admin record with only the validated and hashed fields
    const updatedAdmin = await adminModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    // Check if admin was found and updated
    if (updatedAdmin) {
      res
        .status(200)
        .json({ message: "Admin updated successfully", admin: updatedAdmin });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error("Error updating admin:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete an admin
const deleteAdmin = async (req, res) => {
  const id = req.params.id;

  try {
    // Find and delete admin
    const deletedAdmin = await adminModel.findByIdAndDelete(id);

    // Check if admin was found and deleted
    if (deletedAdmin) {
      res
        .status(200)
        .json({ message: "Admin deleted successfully", admin: deletedAdmin });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    // Handle server errors
    console.error("Error deleting admin:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createAdmin,
  listAdmins,
  editAdmin,
  deleteAdmin,
};
