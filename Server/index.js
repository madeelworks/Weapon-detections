const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');  // Import the auth routes
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL (adjust as needed)
    // methods: 'GET,POST,PUT,DELETE',
    // allowedHeaders: 'Content-Type, Authorization',
   credentials: true,   // Allow cookies (including admin token)
  })
);

mongoose.connect('mongodb://localhost:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/Users')
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// Use the routes for /auth
app.use('/auth', authRoutes);  // Register authentication routes
app.use('/user', userRoutes);  // Register authentication routes

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
