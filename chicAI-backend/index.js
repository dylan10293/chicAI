const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');
const userRoutes = require('./routes/userRoutes');

// Initialize express app
const app = express();

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/user', userRoutes);

// Static folder for profile pictures
app.use('/uploads', express.static('uploads'));

// Start server
const PORT = process.env.PORT || 5001; // Changed to 5001 to avoid port conflict
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
