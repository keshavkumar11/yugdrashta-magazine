const express = require("express");
const Magazine = require("../models/Magazine");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const mongoose = require("mongoose");

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

const Subscription = require("../models/Subscription");

/**
 * @route   GET /api/magazines/:id/download
 * @desc    Download magazine PDF (subscribers only)
 * @access  Logged-in + Active Subscription
 */
router.get("/:id/download", protect, async (req, res) => {
  try {
    // console.log("DOWNLOAD ROUTE HIT");
    // console.log("Magazine ID:", req.params.id);

    const mongoose = require("mongoose");
    // console.log(
    //   "Is valid ObjectId:",
    //   mongoose.Types.ObjectId.isValid(req.params.id)
    // );
    // 1️⃣ Check active subscription
    const activeSubscription = await Subscription.findOne({
      user: req.user._id,
      status: "ACTIVE",
      endDate: { $gte: new Date() }
    });

    if (!activeSubscription) {
      return res
        .status(403)
        .json({ message: "Active subscription required to download PDF" });
    }

    // 2️⃣ Fetch magazine
    const magazine = await Magazine.findById(req.params.id);

    if (!magazine || !magazine.isActive) {
      return res.status(404).json({ message: "Magazine not found" });
    }
console.log("Magazine ID:", req.params.id);
console.log("Is valid ObjectId:", mongoose.Types.ObjectId.isValid(req.params.id));

    // 3️⃣ Allow download (redirect for now)
    res.json({
      message: "Access granted",
      pdfUrl: magazine.pdfUrl
    });
  } catch (error) {
    res.status(500).json({ message: "PDF access failed" });
  }
});


module.exports = router;
