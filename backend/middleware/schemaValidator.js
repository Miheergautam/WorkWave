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


module.exports = {
  adminValidationSchema,
};
