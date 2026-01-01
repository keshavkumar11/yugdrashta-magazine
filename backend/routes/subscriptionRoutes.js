const express = require("express");
const Subscription = require("../models/Subscription");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

/**
 * @route   POST /api/subscriptions
 * @desc    Create subscription (called after payment success later)
 * @access  User
 */
router.post("/", protect, async (req, res) => {
  try {
    const { planType, amount, startDate, endDate } = req.body;

    const subscription = await Subscription.create({
      user: req.user._id,
      planType,
      amount,
      startDate,
      endDate
    });

    res.status(201).json(subscription);
  } catch (error) {
    res.status(500).json({ message: "Subscription creation failed" });
  }
});

/**
 * @route   GET /api/subscriptions
 * @desc    Get all subscriptions
 * @access  Admin
 */
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("user", "name email phone address");

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subscriptions" });
  }
});

module.exports = router;
