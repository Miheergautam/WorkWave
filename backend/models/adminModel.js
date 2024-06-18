const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware for password hashing (ensure to use bcrypt or similar library)
// Note: This should be done in the route handling or a separate file, not in the schema itself
// adminSchema.pre('save', async function (next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 12);
//     }
//     next();
// });

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
