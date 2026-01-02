const express = require("express");
const razorpay = require("../utils/razorpay");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * @route   POST /api/payments/create-order
 * @desc    Create Razorpay order
 * @access  Logged-in user
 */
router.post("/create-order", protect, async (req, res) => {
  try {
    const { amount, planType } = req.body;

    const options = {
      amount: amount * 100, // Razorpay uses paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      planType
    });
  } catch (error) {
    console.error("Razor Pay Error : ",error)
    res.status(500).json({ message: "Razorpay order creation failed" ,
        error:error.message
    });
    
  }
});

module.exports = router;
