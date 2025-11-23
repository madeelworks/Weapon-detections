const router = require("express").Router();
const Camera = require("../models/Camera");

router.get("/", async (req, res) => {
  try {
    const items = await Camera.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const item = await Camera.create(req.body);
    res.json({ success: true, data: item });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Camera.findByIdAndUpdate(id, req.body, { new: true });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json({ success: true, data: item });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Camera.findByIdAndDelete(id);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;