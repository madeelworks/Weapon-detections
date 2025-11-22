const router = require("express").Router();
const Detection = require("../models/Detection");
const UsersModel = require("../models/Users");

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
    res.json({ success: true, id: detection._id });
  } catch (err) {
    console.error("Detection save error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userID = req.params.id; 

    console.log("User ID:", userID); 

    if (!userID) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const detection = await Detection.find({ userID });

    if (!detection || detection.length === 0) {
      return res.status(404).json({ success: false, message: "No detections found." });
    }

    // Attach user info to results
    const user = await UsersModel.findById(userID).select("firstName lastName email");
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
    console.error("Detection save error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Get all detections (admin view)
router.get("/all", async (req, res) => {
  try {
    const detections = await Detection.find({}).sort({ timestamp: -1 });
    const userIds = [...new Set(detections.map(d => d.userID).filter(Boolean))];
    const users = await UsersModel.find({ _id: { $in: userIds } }).select("firstName lastName email");
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
