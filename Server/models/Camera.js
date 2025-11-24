const mongoose = require("mongoose");

const CameraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, enum: ["rtsp", "usb"], required: true },
  streamUrl: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  resolution: { type: String, enum: ["1080p", "720p", "480p"], default: "1080p" },
  frameRate: { type: Number, default: 30 },
  bitrate: { type: Number, default: 4000 },
  sensitivity: { type: String, enum: ["high", "medium", "low"], default: "medium" },
  threshold: { type: Number, default: 50 },
}, { timestamps: true });

module.exports = mongoose.model("Camera", CameraSchema);