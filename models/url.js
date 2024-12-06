const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const urlSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    visiterHistory: [visitorSchema],
  },

  { timestamps: true }
);

const urlModel = mongoose.model("url", urlSchema);

module.exports = urlModel;
