const router = require("express").Router();
const mongoose = require("mongoose");
const Detection = require("../models/Detection");
const UsersModel = require("../models/Users");
const SibApiV3Sdk = require('sib-api-v3-sdk');

async function sendDetectionEmail(toEmail, className, confidence, s3Url, location) {
  try {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SENDINBLUE_API_KEY;
    if (!apiKey.apiKey) {
      console.error('Brevo API key missing');
      return;
    }
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { email: 'adeel.techpro@gmail.com', name: 'Recon Eye' };
    sendSmtpEmail.to = [{ email: toEmail }];
    sendSmtpEmail.subject = 'Weapon detected';
    sendSmtpEmail.textContent = `Weapon detected: ${className} (${Math.round((confidence || 0) * 100)}%). ${location ? 'Location: ' + location : ''}`;
    if (s3Url) {
      sendSmtpEmail.htmlContent = `<p>Weapon detected: <strong>${className}</strong> (${Math.round((confidence || 0) * 100)}%).</p>${location ? `<p>Location: ${location}</p>` : ''}<p><a href="${s3Url}">View image</a></p>`;
    }
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log('Brevo detection email sent to', toEmail);
  } catch (err) {
    console.error('Brevo send email error:', err && err.message ? err.message : String(err));
  }
}

router.post("/", async (req, res) => {
  try {
    const { class_name, confidence, s3_url, s3_key, timestamp, userID } = req.body;

    const detection = new Detection({
      class_name,
      confidence,
      s3_url,
      s3_key,
      timestamp: timestamp ? new Date(timestamp) : undefined,
      userID: userID,
      isViewed: false
    });

    await detection.save();
    const user = await UsersModel.findById(userID).select('email');
    if (user && user.email) {
      sendDetectionEmail(user.email, class_name, confidence, s3_url, detection.location);
    }
    res.json({ success: true, id: detection._id });
  } catch (err) {
    console.error("Detection save error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all detections (admin view) - MUST be above parameterized routes
router.get("/all", async (req, res) => {
  try {
    const detections = await Detection.find({}).sort({ timestamp: -1 });
    const userIds = [...new Set(detections.map(d => d.userID).filter(Boolean))];
    const validUserIds = userIds.filter(id => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id));
    const users = validUserIds.length > 0
      ? await UsersModel.find({ _id: { $in: validUserIds } }).select("firstName lastName email")
      : [];
    const userMap = new Map(users.map(u => [String(u._id), { firstName: u.firstName, lastName: u.lastName, email: u.email }]));

    const data = detections.map(d => ({
      _id: d._id,
      class_name: d.class_name,
      confidence: d.confidence,
      s3_url: d.s3_url,
      s3_key: d.s3_key,
      userID: d.userID,
      location: d.location,
      isViewed: d.isViewed,
      timestamp: d.timestamp,
      user: userMap.get(String(d.userID)) || null,
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error("Detection fetch all error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Admin detections with pagination and filters
router.get('/admin', async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.max(1, Math.min(50, parseInt(req.query.limit, 10) || 12));
    const q = String(req.query.q || '').trim().toLowerCase();
    const status = String(req.query.status || 'all'); // 'all' | 'ack' | 'unack'
    const name = String(req.query.name || '').trim();
    const days = parseInt(req.query.days, 10);

    const query = {};
    if (status === 'ack') query.isViewed = true;
    else if (status === 'unack') query.isViewed = false;

    const textFilter = q
      ? {
          $or: [
            { class_name: { $regex: q, $options: 'i' } },
            { location: { $regex: q, $options: 'i' } },
          ],
        }
      : null;

    const finalQuery = textFilter ? { ...query, ...textFilter } : { ...query };

    if (!isNaN(days) && days > 0) {
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
      finalQuery.timestamp = { $gte: since };
    }

    let userFilterIds = null;
    if (name) {
      const matchedUsers = await UsersModel.find({
        $or: [
          { firstName: { $regex: name, $options: 'i' } },
          { lastName: { $regex: name, $options: 'i' } },
          { email: { $regex: name, $options: 'i' } },
        ],
      }).select('_id');
      userFilterIds = matchedUsers.map(u => String(u._id));
      if (userFilterIds.length === 0) {
        return res.json({ success: true, data: [], page, pages: 1, total: 0 });
      }
      finalQuery.userID = { $in: userFilterIds };
    }

    const total = await Detection.countDocuments(finalQuery);
    const detections = await Detection.find(finalQuery)
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const userIds = [...new Set(detections.map(d => d.userID).filter(Boolean))];
    const validUserIds2 = userIds.filter(id => typeof id === 'string' && mongoose.Types.ObjectId.isValid(id));
    const users = validUserIds2.length > 0
      ? await UsersModel.find({ _id: { $in: validUserIds2 } }).select('firstName lastName email')
      : [];
    const userMap = new Map(users.map(u => [String(u._id), { firstName: u.firstName, lastName: u.lastName, email: u.email }]));

    const data = detections.map(d => ({
      _id: d._id,
      class_name: d.class_name,
      confidence: d.confidence,
      s3_url: d.s3_url,
      s3_key: d.s3_key,
      userID: d.userID,
      location: d.location,
      isViewed: d.isViewed,
      timestamp: d.timestamp,
      user: userMap.get(String(d.userID)) || null,
    }));

    res.json({ success: true, data, page, pages: Math.max(1, Math.ceil(total / limit)), total });
  } catch (err) {
    console.error('Admin detections error:', err);
    res.status(500).json({ error: err.message });
  }
});

// Get detections for a specific user
router.get("/:id", async (req, res) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const detection = await Detection.find({ userID });

    if (!detection || detection.length === 0) {
      return res.status(404).json({ success: false, message: "No detections found." });
    }

    const user = (typeof userID === 'string' && mongoose.Types.ObjectId.isValid(userID))
      ? await UsersModel.findById(userID).select("firstName lastName email")
      : null;
    const data = detection.map(d => ({
      _id: d._id,
      class_name: d.class_name,
      confidence: d.confidence,
      s3_url: d.s3_url,
      s3_key: d.s3_key,
      userID: d.userID,
      location: d.location,
      isViewed: d.isViewed,
      timestamp: d.timestamp,
      user: user ? { firstName: user.firstName, lastName: user.lastName, email: user.email } : null,
    }));

    res.json({ success: true, data });
  } catch (err) {
    console.error("Detection fetch by user error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Acknowledge a detection (mark as viewed)
router.put("/:detectionId/acknowledge", async (req, res) => {
  try {
    const { detectionId } = req.params;
    if (!detectionId) return res.status(400).json({ error: "Detection ID is required." });

    const updated = await Detection.findByIdAndUpdate(
      detectionId,
      { $set: { isViewed: true } },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Detection not found." });

    res.json({ success: true, data: { _id: updated._id, isViewed: updated.isViewed } });
  } catch (err) {
    console.error("Detection acknowledge error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
