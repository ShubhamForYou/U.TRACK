const asyncHandler = require("express-async-handler");
const urlModel = require("../models/url");

// redirect to Org. UrL
const redirectUrl = asyncHandler(async (req, res) => {
  const shortId = req.params.shortId;
  if (!shortId) {
    res.status(404);
    throw new Error("short-ID not found");
  }
  const visitorData = {
    ip: req.ip,
    userAgent: req.headers["user-agent"],
  };
  const urlEntry = await urlModel.findOneAndUpdate(
    { shortId },
    { $push: { visitorHistory: visitorData } }
  );
  if (!urlEntry) {
    res.status(404);
    throw new Error("url not found");
  }
  res.redirect(urlEntry.redirectUrl);
});

module.exports = redirectUrl;
