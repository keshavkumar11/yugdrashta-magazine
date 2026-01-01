const mongoose = require("mongoose");

const magazineSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    // Display purpose (UI)
    editionMonth: {
      type: String,
      required: true // e.g. "August 2025"
    },

    // Logic purpose (sorting, filtering)
    editionDate: {
      type: Date,
      required: true // e.g. 2025-08-01
    },

    // PDF storage (Cloudinary / S3 later)
    pdfUrl: {
      type: String,
      required: true
    },

    // Admin who uploaded it
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // Enable / disable visibility
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Magazine", magazineSchema);
