const zod = require("zod");

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

const passwordValidatorSchema = zod.object({
  currentPassword: zod.string().min(6).max(50),
  newPassword: zod.string().min(6).max(50),
  confirmPassword: zod.string().min(6).max(50),
});

module.exports = {
  adminValidationSchema,
  userValidationSchema,
  passwordValidatorSchema,
};
