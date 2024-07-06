const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Define the candidate schema
const candidateSchema = new mongoose.Schema(
  {
    // Unique identifier for each candidate, generated using UUID v4
    candidateId: {
      type: String,
      default: uuidv4,
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

    mobile: {
      type: String,
      required: [true, "Mobile number is required"],
      unique: true,
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
      trim: true,
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
