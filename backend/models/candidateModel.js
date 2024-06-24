const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const candidateSchema = new mongoose.Schema(
  {
    candidateId: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    alternativeMobile: {
      type: String,
      trim: true,
    },
    skypeId: {
      type: String,
      trim: true,
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
      type: Number, // Assuming experience in years
      min: 0,
    },
    currentCTC: {
      type: Number, // Assuming CTC as a number
      min: 0,
    },
    expectedCTC: {
      type: Number, // Assuming CTC as a number
      min: 0,
    },
    expectedJoiningDate: {
      type: Date,
    },
    machineRound: {
      type: String,
      enum: ["pending", "cleared", "failed"],
    },
    technicalInterviewRound: {
      type: String,
      enum: ["pending", "cleared", "failed"],
    },
    hrInterviewRound: {
      type: String,
      enum: ["pending", "cleared", "failed"],
    },
    selectionStatus: {
      type: String,
      enum: ["selected", "rejected", "on hold"],
    },
    address: {
      type: String,
      trim: true,
    },
    idProof: {
      type: String,
      trim: true,
    },
    education: {
      tenthPercentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      twelfthPercentage: {
        type: Number,
        min: 0,
        max: 100,
      },
      graduationPercentage: {
        type: Number,
        min: 0,
        max: 100,
      },
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

candidateSchema.index({ email: 1, mobile: 1 });

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
