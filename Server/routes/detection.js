const router = require("express").Router();
const Detection = require("../models/Detection");
const Notification = require("../models/Notification");
// const verifyToken = require("../middleware/verifyToken");
const admin = require("../config/firebaseAdmin");
const User = require("../models/Users");
router.post("/", async (req, res) => {
  try {
    const { class_name, confidence, s3_url, s3_key, timestamp, userId } =
      req.body;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    // 1. Save detection
    const detection = new Detection({
      userId,
      class_name,
      confidence,
      s3_url,
      s3_key,
      timestamp: timestamp ? new Date(timestamp) : new Date(),
    });

    await detection.save();
    console.log("Detection saved:", detection._id);

    // 2. Create notification — MUST await + proper model name
    try {
      await Notification.create({
        userId,
        title: "Detection Found!",
        body: `${class_name} detected (${(confidence * 100).toFixed(
          1
        )}% confidence)`,
        imageUrl: s3_url,
        data: {
          detectionId: detection._id.toString(),
          s3_url,
          type: "detection_result",
        },
      });
      console.log("Notification created in DB");
    } catch (notifErr) {
      console.error("Failed to save notification:", notifErr.message);
      // Don't fail the whole request — just log
    }

    // 3. Send FCM
    try {
      const user = await User.findById(userId).select("fcmToken");
      if (user?.fcmToken) {
        await admin.messaging().send({
          token: user.fcmToken,
          notification: {
            title: "Detection Found!",
            body: `${class_name} detected (${(confidence * 100).toFixed(
              1
            )}% confidence)`,
            image: s3_url,
          },
          data: {
            detectionId: detection._id.toString(),
            s3_url,
            type: "detection_result",
          },
          android: {
            priority: "high",
            notification: {
              channelId: "detection_channel",
              sound: "default",
              image: s3_url,
            },
          },
        });
        console.log("FCM sent to user:", userId);
      }
    } catch (fcmErr) {
      console.warn("FCM failed:", fcmErr.message);
    }

    res.json({
      success: true,
      detectionId: detection._id,
      message: "Detection processed",
    });
  } catch (err) {
    console.error("Detection route error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
