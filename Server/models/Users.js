const mongoose = require('mongoose');

// Define the User Schema
const UsersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'Member',  // Default role is Member
  }
}, { timestamps: true });

const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;
