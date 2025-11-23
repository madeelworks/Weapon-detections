const mongoose = require('mongoose');

const SuspiciousReportSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  status: { type: String, default: 'submitted' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('SuspiciousReport', SuspiciousReportSchema);