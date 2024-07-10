const mongoose = require("mongoose");

// Define the candidate schema
const candidateSchema = new mongoose.Schema(
  {
    // Unique identifier for each candidate, generated using UUID v4
    candidateId: {
      type: String,
      required: [true, "Candidate ID is required"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Other"],
        message: "Invalid gender value",
      },
    },

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true,
      match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"],
    },
    linkedIn: {
      type: String,
      trim: true,
    },
    resume: {
      type: String,
    },
    skills: {
      type: [String],
    },
    experience: {
      type: Number,
      min: [0, "Experience cannot be negative"],
    },
    appliedPosition: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: {
        values: ["applied", "shortlisted", "rejected"],
        message: "Invalid status value",
      },
      default: "applied",
    },
    appliedDate: {
      type: Date,
      default: Date.now,
    },
    idProof: {
      type: String,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
