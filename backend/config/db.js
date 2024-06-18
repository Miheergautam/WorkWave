// Import necessary modules
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Check if MONGO_URI is set in the environment variables
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }

    // Connect to the MongoDB database
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // Exit the process with failure
  }
};

// Export the connectDB function as the default export
module.exports = connectDB;
