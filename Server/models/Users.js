const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure unique email
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const UsersModel = mongoose.model('Users', UsersSchema);

module.exports = UsersModel;
