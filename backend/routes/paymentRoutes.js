const express = require("express");
const razorpay = require("../utils/razorpay");
const protect = require("../middleware/authMiddleware");
const crypto = require("crypto");          
const Subscription = require("../models/Subscription");

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

router.post("/verify", protect, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planType,
      amount
    } = req.body;

    // 1️⃣ Generate signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // 2️⃣ TEST MODE CHECK (IMPORTANT)
    const isTestMode = process.env.PAYMENT_TEST_MODE === "true";

    if (!isTestMode && expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // 3️⃣ Calculate subscription dates
    const startDate = new Date();
    const endDate = new Date();

    if (planType === "yearly") {
      endDate.setFullYear(endDate.getFullYear() + 1);
    } else {
      endDate.setMonth(endDate.getMonth() + 1);
    }

    // 4️⃣ Create subscription
    const subscription = await Subscription.create({
      user: req.user._id,
      planType,
      amount,
      startDate,
      endDate,
      status: "ACTIVE"
    });

    res.json({
      message: "Payment verified & subscription activated",
      subscription
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Payment verification failed",
      error: error.message
    });
  }
});



module.exports = router;
