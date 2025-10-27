const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/Users');
const { loginUser } = require('../services/auth');

const router = express.Router();

// JWT Secret Key (for simplicity, use a hardcoded secret in this example)
const JWT_SECRET_KEY = 'adeel'; 

// Admin credentials
const ADMIN_EMAIL = "admin@example.com"; 
const ADMIN_PASSWORD = "adminpassword"; 

// Admin login
router.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin', email: ADMIN_EMAIL }, JWT_SECRET_KEY, { expiresIn: '1h' });

    res.cookie("adminAuth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({ message: 'Admin login successful' });
  }

  return res.status(401).json({ error: 'Invalid admin credentials' });
});

// Admin route to add a new user
router.post('/admin/add-user', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Hash the password before saving it to the DB
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UsersModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ error: 'Error adding user: ' + err.message });
  }
});
// User login (for all users, not just admins)
// User login (for all users, not just admins)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("Did we reach this one?")
    const token = await loginUser(email, password, res);
    res.status(200).json({ message: 'success', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all users (this should be protected, i.e., for admin only)
router.get('/users', async (req, res) => {
  try {
    const users = await UsersModel.find();  // Fetch all users from the database
    res.status(200).json(users);  // Send users as response
  } catch (err) {
    res.status(500).json({ error: 'Error fetching users: ' + err.message });
  }
});

// Update User (Edit User)
router.put('/admin/update-user/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, password, role } = req.body;

  try {
    // Hash the password if it's being updated
    const updatedData = {
      firstName,
      lastName,
      email,
      role,
    };
    
    // If password is provided, hash it
    if (password) {
      updatedData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await UsersModel.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: 'Error updating user: ' + err.message });
  }
});

// Delete User
router.delete('/admin/delete-user/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UsersModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error deleting user: ' + err.message });
  }
});



// Export routes
module.exports = router;
