const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db/connection');
const userRoutes = require('./routes/userRoutes');
const calendarRoutes = require('./routes/calendarRoutes'); // Import event routes
const path = require('path');

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
app.use('/events', calendarRoutes); // Add the route for event-related operations

// Static folder for profile pictures and uploads
app.use('/uploads', express.static('uploads'));

// Serve static files for the frontend (optional)
app.use(express.static(path.join(__dirname, '../chicAI-frontend/build')));

// Fallback for React frontend routes (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../chicAI-frontend/build', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
