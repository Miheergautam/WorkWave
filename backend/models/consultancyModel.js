const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConsultancySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
    },
    contactNumbers: [
      {
        type: String,
      },
    ],
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    address: {
      type: String,
    },
    contractAgreement: {
      type: String,
    },
    contactPersonName: {
      type: String,
    },
    contactLinkedInProfile: {
      type: String,
    },
    servicesProvided: {
      type: [String], // Array of strings to hold different services
    },
    contractStartDate: {
      type: Date,
    },
    contractEndDate: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Consultancy = mongoose.model("Consultancy", ConsultancySchema);

module.exports = Consultancy;
