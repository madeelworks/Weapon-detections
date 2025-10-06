const express = require('express');
const { adminLogin, registerUser, loginUser } = require('../services/auth');
const router = express.Router();

// Register route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = await registerUser(email, password);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password, res);  // Ensure res is passed here
    res.status(200).json({ message: 'success', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Login route
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Admin credentials",  email, password)
    const token = await adminLogin(email, password, res);  // Ensure res is passed here
    res.status(200).json({ message: 'success', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
