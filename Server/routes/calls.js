const router = require('express').Router();
const jwt = require('jsonwebtoken');
const CallLog = require('../models/CallLog');

// Log a call made by the current user
router.post('/', async (req, res) => {
  try {
    const token = req.cookies.Authorization;
    if (!token) return res.status(403).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, 'adeel');
    const userID = decoded.userId;

    const { number, label } = req.body;
    if (!number) return res.status(400).json({ message: 'Number is required' });

    const log = new CallLog({ userID, number, label });
    await log.save();
    res.json({ success: true, data: log });
  } catch (err) {
    console.error('Call log create error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get all call logs for current user
router.get('/mine', async (req, res) => {
  try {
    const token = req.cookies.Authorization;
    if (!token) return res.status(403).json({ message: 'No token provided' });
    const decoded = jwt.verify(token, 'adeel');
    const userID = decoded.userId;

    const logs = await CallLog.find({ userID }).sort({ timestamp: -1 });
    res.json({ success: true, data: logs });
  } catch (err) {
    console.error('Call log fetch error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;