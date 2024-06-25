const mongoose = require("mongoose");

const helpCenterSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      index: true, // Index for faster search
    },
    employeeId: {
      type: String,
      required: true,
      index: true, // Index for faster search
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"], // Using enum to restrict values
    },
    department: {
      type: String,
      required: true,
    },
    dateOfCreation: {
      type: Date,
      required: true,
      default: Date.now, // Default to current date if not provided
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"], // Using enum to restrict values
    },
    dateOfCompletion: {
      type: Date,
    },
    assignedTo: {
      type: String,
    },
    solvedBy: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Index for faster search on multiple fields
helpCenterSchema.index({ ticketId: 1, employeeId: 1 });

const HelpCenter = mongoose.model("HelpCenter", helpCenterSchema);

module.exports = HelpCenter;
