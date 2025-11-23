const mongoose = require('mongoose');

const CallLogSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  number: { type: String, required: true },
  label: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CallLog', CallLogSchema);