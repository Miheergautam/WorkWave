const adminModel = require("../models/adminModel");
const { adminValidationSchema } = require("../middleware/schemaValidator");

const createAdmin = async (req, res) => {
  try {
    if (req.body.dateOfBirth) {
      req.body.dateOfBirth = new Date(req.body.dateOfBirth);
    }
    const { success, data, error } = adminValidationSchema.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ errors: error.errors });
    }
    // Check if admin with the same email already exists
    const existingAdmin = await adminModel.findOne({ email: data.email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Create a new admin instance
    const newAdmin = new adminModel(data);
    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({
      message: "Admin created successfully",
    });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// List all admins
const getAdmins = async (req, res) => {
  try {
    // Fetch all admins, excluding the password field
    const admins = await adminModel.find().select("-password");

    // Respond with list of admins
    res.status(200).json({
      message: "Admins fetched successfully",
      data: admins,
    });
  } catch (error) {
    // Handle server errors
    console.error("Error listing admins:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateAdmin = async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ message: "Admin ID is required" });

  const { success, data, error } = adminValidationSchema.safeParse(req.body);
  if (!success) return res.status(400).json({ errors: error.errors });

  try {
    // Check if email is being updated (not allowed)
    if (data.email !== undefined) {
      return res.status(400).json({ message: "Email cannot be updated" });
    }

    // Update admin record with only the validated and hashed fields
    const updatedAdmin = await adminModel
      .findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true })
      .select("-password");

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
  try {
    const id = req.params.id;
    // Find and delete admin
    const deletedAdmin = await adminModel.findByIdAndDelete(id);
    // Check if admin was found and deleted
    if (deletedAdmin) {
      res.status(200).json({ message: "Admin deleted successfully" });
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
  getAdmins,
  updateAdmin,
  deleteAdmin,
};
