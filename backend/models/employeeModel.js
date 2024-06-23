const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    default: uuidv4, // Generate unique employee ID
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
  },
  password: {
    type: String,
    required: true,
  },
  // Add the validator for the mobile number
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number.']
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
    match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code.']
  },
  country: {
    type: String,
  },
  role: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On Leave', 'Terminated'],
    default: 'Active',
  },
  skills: {
    type: [String],
  },
  department: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
  },
  idProof: {
    type: String,
  },
  panCard: {
    type: String,
  },
  marksheet: {
    type: String,
  },
  salary: {
    type: Number,
  },
  dateOfJoining: {
    type: Date,
  },
  dateOfBirth: {
    type: Date,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  emergencyContactName: {
    type: String,
  },
  emergencyContactPhone: {
    type: String,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number.']
  },
  emergencyContactRelation: {
    type: String,
  },
  managerId: {
    type: String,
  },
  projects: {
    type: [String],
  },
  performanceReviews: [{
    reviewDate: { type: Date },
    reviewer: { type: String },
    comments: { type: String }
  }],
  lastLogin: {
    type: Date,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
  dateModified: {
    type: Date,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
