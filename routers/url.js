const express = require("express");
const router = express.Router();
const {
  createUrl,
  redirectUrl,
  getVisiterCount,
} = require("../controllers/url");

//set controllers
router.post("/create", createUrl);
router.get("/utrack/:shortId", redirectUrl);
router.get("/visitorCount", getVisiterCount);

module.exports = router;
