const express = require("express");
const Subscription = require("../models/Subscription");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");
const { Parser } = require("json2csv");

const router = express.Router();

/**
 * @route   GET /api/admin/subscribers
 * @desc    Get all active subscribers with address
 * @access  Admin only
 */
router.get("/subscribers", protect, adminOnly, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      status: "ACTIVE",
      endDate: { $gte: new Date() }
    }).populate(
      "user",
      "name phone whatsappNumber email address"
    );

    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch subscribers" });
  }
});



/**
 * @route   GET /api/admin/subscribers/export
 * @desc    Export active subscribers as CSV
 * @access  Admin only
 */
router.get("/subscribers/export", protect, adminOnly, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({
      status: "ACTIVE",
      endDate: { $gte: new Date() }
    }).populate(
      "user",
      "name phone whatsappNumber email address"
    );

    const data = subscriptions.map(sub => ({
      Name: sub.user.name,
      Phone: sub.user.phone,
      WhatsApp: sub.user.whatsappNumber || "",
      Email: sub.user.email,
      Country: sub.user.address?.country || "",
      State: sub.user.address?.state || "",
      District: sub.user.address?.district || "",
      Taluka: sub.user.address?.taluka || "",
      City: sub.user.address?.villageOrCity || "",
      HouseNo: sub.user.address?.houseNo || "",
      Street: sub.user.address?.societyOrStreet || "",
      Landmark: sub.user.address?.areaOrLandmark || "",
      Pincode: sub.user.address?.pincode || "",
      Plan: sub.planType,
      StartDate: sub.startDate.toDateString(),
      EndDate: sub.endDate.toDateString()
    }));

    const parser = new Parser();
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("yugdrashta-subscribers.csv");
    res.send(csv);

  } catch (error) {
    res.status(500).json({ message: "CSV export failed" });
  }
});


module.exports = router;
