const zod = require("zod");
const { v4: uuidv4 } = require("uuid");

const adminValidationSchema = zod.object({
  firstName: zod.string().min(2).max(50).optional(),
  lastName: zod.string().min(2).max(50).optional(),
  email: zod.string().email().optional(),
  password: zod.string().min(6).optional(),
  dateOfBirth: zod.date().optional(),
  gender: zod.string().min(2).max(10).optional(),
  streetAddress: zod.string().min(2).max(100).optional(),
  city: zod.string().min(2).max(50).optional(),
  state: zod.string().min(2).max(50).optional(),
  country: zod.string().min(2).max(50).optional(),
  zipCode: zod.string().min(2).max(20).optional(),
  phone: zod
    .string()
    .regex(/^\+?\d{10,15}$/, "Please enter a valid phone number")
    .optional(),
  permissions: zod.array(zod.string()).optional(),
  createdBy: zod.string().optional(), // Assuming this is an ObjectId as a string
});

// User Validation Schema
const userValidationSchema = zod.object({
  firstName: zod
    .string()
    .min(2, "First name must be at least 2 characters long")
    .max(50, "First name must be at most 50 characters long")
    .optional(),
  lastName: zod
    .string()
    .min(2, "Last name must be at least 2 characters long")
    .max(50, "Last name must be at most 50 characters long")
    .optional(),
  email: zod.string().email("Invalid email address").optional(),
  password: zod
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  dateOfBirth: zod.string().optional(), // Assuming date is in string format, otherwise use z.date()
  gender: zod
    .string()
    .min(2, "Gender must be at least 2 characters long")
    .max(10, "Gender must be at most 10 characters long")
    .optional(),
  streetAddress: zod
    .string()
    .min(2, "Street address must be at least 2 characters long")
    .max(100, "Street address must be at most 100 characters long")
    .optional(),
  city: zod
    .string()
    .min(2, "City must be at least 2 characters long")
    .max(50, "City must be at most 50 characters long")
    .optional(),
  state: zod
    .string()
    .min(2, "State must be at least 2 characters long")
    .max(50, "State must be at most 50 characters long")
    .optional(),
  country: zod
    .string()
    .min(2, "Country must be at least 2 characters long")
    .max(50, "Country must be at most 50 characters long")
    .optional(),
  zipCode: zod
    .string()
    .min(2, "Zip code must be at least 2 characters long")
    .max(20, "Zip code must be at most 20 characters long")
    .optional(),
  phone: zod
    .string()
    .regex(/^\d{10,15}$/, "Please enter a valid phone number")
    .optional(),
  role: zod
    .enum(["admin", "employee"], "Role must be either admin or employee")
    .optional(),
});

// Password Validation Schema
const passwordValidationSchema = zod.object({
  currentPassword: zod.string().min(6).max(50),
  newPassword: zod.string().min(6).max(50),
  confirmPassword: zod.string().min(6).max(50),
});

const employeeValidationSchema = zod.object({
  employeeId: zod.string().default(() => uuidv4()).optional(),
  firstName: zod.string().min(2, { message: "First name must be at least 2 characters long" }).max(50, { message: "First name must be at most 50 characters long" }).optional(),
  lastName: zod.string().min(2, { message: "Last name must be at least 2 characters long" }).max(50, { message: "Last name must be at most 50 characters long" }).optional(),
  email: zod.string().email({ message: "Please use a valid email address" }).optional(),
  password: zod.string().min(6, { message: "Password must be at least 6 characters long" }).optional(),
  dateOfBirth: zod.date().optional(),
  gender: zod.enum(["Male", "Female", "Other"]).optional(),
  streetAddress: zod.string().min(2, { message: "Street address must be at least 2 characters long" }).max(100, { message: "Street address must be at most 100 characters long" }).optional(),
  city: zod.string().min(2, { message: "City must be at least 2 characters long" }).max(50, { message: "City must be at most 50 characters long" }).optional(),
  state: zod.string().min(2, { message: "State must be at least 2 characters long" }).max(50, { message: "State must be at most 50 characters long" }).optional(),
  country: zod.string().min(2, { message: "Country must be at least 2 characters long" }).max(50, { message: "Country must be at most 50 characters long" }).optional(),
  zipCode: zod.string().min(2, { message: "Zip code must be at least 2 characters long" }).max(20, { message: "zip code must be at most 20 characters long" }).optional(),
  phone: zod.string().regex(/^\d{10,15}$/, { message: "Please enter a valid phone number" }).optional(),

  department: zod.string().min(2, { message: "Department must be at least 2 characters long" }).max(50, { message: "Department must be at most 50 characters long" }).optional(),
  position: zod.string().min(2, { message: "Position must be at least 2 characters long" }).max(50, { message: "Position must be at most 50 characters long" }).optional(),
  dateOfJoining: zod.date().optional(),
  salary: zod.number().optional(),
  manager: zod.string().optional(), // Assuming this is an ObjectId as a string
  projects: zod.array(zod.string()).optional(),
  isManager: zod.boolean().optional(),

  status: zod.enum(["Active", "Inactive", "On Leave", "Terminated"]).default("Active").optional(),
  idProof: zod.string().optional(),
});

const candidateValidationSchema = zod.object({
  firstName: zod.string().min(1).max(50).trim().optional(),
  lastName: zod.string().min(1).max(50).trim().optional(),
  email: zod.string().email().trim().optional(),
  mobile: zod.string().regex(/^\d{10}$/, "Please enter a valid 10-digit mobile number").optional(),
  linkedIn: zod.string().url().trim().optional(),
  resume: zod.string().optional(),
  skills: zod.array(zod.string()).optional(),
  experience: zod.number().min(0).optional(),
  appliedPosition: zod.string().trim().optional(),
  status: zod.enum(["applied", "shortlisted", "rejected"]).optional(),
  idProof: zod.string().optional(),
  notes: zod.string().optional(),
});

const expenseValidationSchema = zod.object({
  expenseId: zod.string().uuid().optional(),
  employeeId: zod.string().optional(),
  amount: zod.number().min(0).optional(),
  description: zod.string().optional(),
  dateOfExpense: zod.date().optional(),
  status: zod.enum(["Pending", "approved", "rejected"]).optional(),
  approvedBy: zod.string().optional(),
});

const helpCenterValidationSchema = zod.object({
  ticketId: zod.string().uuid().optional(),
  createdBy: zod.string().optional(), 
  department: zod.string().optional(),
  issue: zod.string().min(1).max(255).optional(),
  status: zod.enum(["open", "in progress", "resolved", "closed"]).optional(),
  dateOfCreation: zod.date().optional(),
  assignedTo: zod.string().optional(), 
  resolvedDate: zod.date().optional(),
});

const consultancyValidationSchema = zod.object({
  name: zod.string().optional(),
  email: zod.string().email().optional(),
  website: zod.string().url().optional(),
  contactNumbers: zod.array(zod.string()).optional(),
  city: zod.string().optional(),
  state: zod.string().optional(),
  address: zod.string().optional(),
  contractAgreement: zod.string().optional(),
  contactPersonName: zod.string().optional(),
  contactLinkedInProfile: zod.string().url().optional(),
  servicesProvided: zod.array(zod.string()).optional(),
  contractStartDate: zod.date().nullable().optional(),
  contractEndDate: zod.date().nullable().optional(),
  notes: zod.string().optional(),
});

module.exports = {
  adminValidationSchema,
  userValidationSchema,
  passwordValidationSchema,
  employeeValidationSchema,
  candidateValidationSchema,
  expenseValidationSchema,
  helpCenterValidationSchema,
  consultancyValidationSchema,
};
