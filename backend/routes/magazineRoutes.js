const express = require("express");
const Magazine = require("../models/Magazine");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

/**
 * @route   POST /api/magazines
 * @desc    Admin uploads a magazine entry
 * @access  Admin
 */
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, editionMonth, editionDate, pdfUrl } = req.body;

    const magazine = await Magazine.create({
      title,
      editionMonth,
      editionDate,
      pdfUrl,
      uploadedBy: req.user._id
    });

    res.status(201).json(magazine);
  } catch (error) {
    res.status(500).json({ message: "Magazine upload failed" });
  }
});

/**
 * @route   GET /api/magazines
 * @desc    Get all active magazines (users & public)
 * @access  Public / Logged-in
 */
router.get("/", async (req, res) => {
  try {
    const magazines = await Magazine.find({ isActive: true })
      .sort({ editionDate: -1 });

    res.json(magazines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch magazines" });
  }
});

module.exports = router;
