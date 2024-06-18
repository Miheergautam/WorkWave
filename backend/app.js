const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const mainRouter = require('./routes/index');

dotenv.config(); // Load environment variables

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
// It will parse the incoming request with JSON payloads
app.use(express.json());

// Define Routes
app.use('/api', mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

module.exports = app;
