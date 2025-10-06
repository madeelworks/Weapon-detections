const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');  // Import the auth routes

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Users')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use the routes for /auth
app.use('/auth', authRoutes);

// Use the routes for admin/auth
app.use('/auth', authRoutes);

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
