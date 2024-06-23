const zod = require("zod");
const { v4: uuidv4 } = require("uuid");

// Admin Validation Schema
const adminValidationSchema = zod.object({
  firstName: zod.string().min(2).max(50).optional(),
  lastName: zod.string().min(2).max(50).optional(),
  email: zod.string().email().optional(),
  password: zod.string().min(6).optional(),
  city: zod.string().min(2).max(50).optional(),
  state: zod.string().min(2).max(50).optional(),
  country: zod.string().min(2).max(50).optional(),
  address: zod.string().min(2).max(100).optional(),
});

// User Validation Schema
const userValidationSchema = zod.object({
  firstName: zod.string().min(2).max(50).optional(),
  lastName: zod.string().min(2).max(50).optional(),
  email: zod.string().email().optional(),
  password: zod.string().min(6).optional(),
  dateOfBirth: zod.string().min(2).max(50).optional(),
  gender: zod.string().min(2).max(10).optional(),
  address: zod.string().min(2).max(100).optional(),
  city: zod.string().min(2).max(50).optional(),
  state: zod.string().min(2).max(50).optional(),
  country: zod.string().min(2).max(50).optional(),
});

// Password Validation Schema
const passwordValidationSchema = zod.object({
  currentPassword: zod.string().min(6).max(50),
  newPassword: zod.string().min(6).max(50),
  confirmPassword: zod.string().min(6).max(50),
});

//Employee Validation Schema
const employeeValidationSchema = zod.object({
  employeeId: zod
    .string()
    .default(() => uuidv4())
    .optional(),
  firstName: zod.string().optional("First name is required"),
  lastName: zod.string().optional("Last name is required"),
  email: zod.string().email("Please use a valid email address").optional(),
  password: zod.string().optional("Password is required"),
  mobile: zod
    .string()
    .regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number"),
  address: zod.string().optional(),
  city: zod.string().optional(),
  state: zod.string().optional(),
  zip: zod
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code")
    .optional(),
  country: zod.string().optional(),
  role: zod.string().optional(),
  status: zod
    .enum(["Active", "Inactive", "On Leave", "Terminated"])
    .default("Active")
    .optional(),
  skills: zod.array(zod.string()).optional(),
  department: zod.string().optional("Department is required"),
  jobTitle: zod.string().optional("Job title is required"),
  resume: zod.string().optional(),
  idProof: zod.string().optional(),
  panCard: zod.string().optional(),
  marksheet: zod.string().optional(),
  salary: zod.number().optional(),
  dateOfJoining: zod.date().optional(),
  dateOfBirth: zod.date().optional(),
  gender: zod.enum(["Male", "Female", "Other"]).optional(),
  emergencyContactName: zod.string().optional(),
  emergencyContactPhone: zod
    .string()
    .regex(/^\d{10}$/, "Please enter a valid 10-digit phone number")
    .optional(),
  emergencyContactRelation: zod.string().optional(),
  managerId: zod.string().optional(),
  projects: zod.array(zod.string()).optional(),
  performanceReviews: zod
    .array(
      zod.object({
        reviewDate: zod.date().optional(),
        reviewer: zod.string().optional(),
        comments: zod.string().optional(),
      })
    )
    .optional(),
  lastLogin: zod.date().optional(),
  dateCreated: zod
    .date()
    .default(() => new Date())
    .optional(),
  dateModified: zod.date().optional(),
});

module.exports = {
  adminValidationSchema,
  userValidationSchema,
  passwordValidationSchema,
  employeeValidationSchema,
};
