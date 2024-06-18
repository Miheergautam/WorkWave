const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const z = require("zod");

const adminValidationSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(12),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  country: z.string().min(2).max(50),
  address: z.string().min(2).max(100),
  createdAt: z.date().default(() => new Date()),
});

const createAdmin = async (req, res) => {
  try {
    const adminData = adminValidationSchema.parse(req.body);

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    // Create a new admin instance
    const newAdmin = new adminModel({
      ...adminData,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully", userId: newAdmin._id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation error
      res.status(400).json({ errors: error.errors });
    } else {
      // Other server errors
      console.error("Error creating admin:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
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

const adminEditValidationSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).max(12).optional(),
  city: z.string().min(2).max(50).optional(),
  state: z.string().min(2).max(50).optional(),
  country: z.string().min(2).max(50).optional(),
  address: z.string().min(2).max(100).optional(),
});

const editAdmin = async (req, res) => {
  const id = req.params.id;
  console.log(req.body);

  // Validate id parameter
  if (!id) return res.status(400).json({ message: "Admin ID is required" });

  try {
    // Pick only the fields that are present in req.body and validate them
    const adminData = adminEditValidationSchema.parse(req.body);

    // Check if email is being updated (not allowed)
    if (req.body.email !== undefined) {
      return res.status(400).json({ message: "Email cannot be updated" });
    }

    // Hash the password if provided
    if (adminData.password) {
      adminData.password = await bcrypt.hash(adminData.password, 12);
    }

    // Update admin record with only the validated and hashed fields
    const updatedAdmin = await adminModel.findByIdAndUpdate(
      id,
      { $set: adminData },
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
    // Handle validation errors (ZodError) and server errors
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    } else {
      console.error("Error updating admin:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
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
