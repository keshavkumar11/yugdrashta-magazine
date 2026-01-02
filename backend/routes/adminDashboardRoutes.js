const express = require("express");
const Subscription = require("../models/Subscription");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

/**
 * @route   GET /api/admin/dashboard/summary
 * @desc    Get dashboard summary stats
 * @access  Admin only
 */
router.get("/summary", protect, adminOnly, async (req, res) => {
  try {
    const totalSubscriptions = await Subscription.countDocuments();

    const activeSubscriptions = await Subscription.countDocuments({
      status: "ACTIVE",
      endDate: { $gte: new Date() }
    });

    const expiredSubscriptions = await Subscription.countDocuments({
      endDate: { $lt: new Date() }
    });

    const revenueData = await Subscription.aggregate([
      {
        $match: { status: "ACTIVE" }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$amount" }
        }
      }
    ]);

    res.json({
      totalSubscriptions,
      activeSubscriptions,
      expiredSubscriptions,
      totalRevenue: revenueData[0]?.totalRevenue || 0
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard summary" });
  }
});

/**
 * @route   GET /api/admin/dashboard/monthly
 * @desc    Get month-wise subscription count
 * @access  Admin only
 */
router.get("/monthly", protect, adminOnly, async (req, res) => {
  try {
    const monthlyData = await Subscription.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } }
    ]);

    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ message: "Failed to load monthly stats" });
  }
});

module.exports = router;
