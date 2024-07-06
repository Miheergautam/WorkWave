const mongoose = require("mongoose");
const User = require("./userModel");
const { v4: uuidv4 } = require("uuid");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
  },
  department: {
    type: String,
    trim: true,
  },
  position: {
    type: String,
    trim: true,
  },
  dateOfJoining: {
    type: Date,
    default: Date.now,
  },
  salary: {
    type: Number,
    default: 0,
  },
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: null,
  },
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    }
  ],
  isManager: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Employee = User.discriminator("Employee", employeeSchema);

module.exports = Employee;