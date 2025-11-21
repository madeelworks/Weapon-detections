const router = require("express").Router();
const Detection = require("../models/Detection");

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

    // Return the filtered results
    res.json({ success: true, data: detection });
  } catch (err) {
    console.error("Detection save error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
