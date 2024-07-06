const mongoose = require("mongoose");
const User = require("./userModel");

const adminSchema = new mongoose.Schema({
  permissions: { type: [String], default: [] },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
});

const Admin = User.discriminator("Admin", adminSchema);

module.exports = Admin;
