const router = require('express').Router();
const jwt = require('jsonwebtoken');
const SuspiciousReport = require('../models/SuspiciousReport');

// Create a suspicious activity report (user)
router.post('/', async (req, res) => {
  try {
    const token = req.cookies.Authorization;
    if (!token) return res.status(403).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, 'adeel');
    const userID = decoded.userId;

    const { category, location, description, imageUrl } = req.body;
    if (!category || !location || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const report = new SuspiciousReport({ userID, category, location, description, imageUrl });
    await report.save();
    res.json({ success: true, data: report });
  } catch (err) {
    console.error('Report create error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get reports for current user
router.get('/mine', async (req, res) => {
  try {
    const token = req.cookies.Authorization;
    if (!token) return res.status(403).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, 'adeel');
    const userID = decoded.userId;

    const reports = await SuspiciousReport.find({ userID }).sort({ timestamp: -1 });
    res.json({ success: true, data: reports });
  } catch (err) {
    console.error('Report fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;