const express = require("express");
const router = express.Router();
const { createUrl, redirectUrl } = require("../controllers/url");

//set controllers
router.post("/create", createUrl);
router.get("/utrack/:shortUrl", redirectUrl);

module.exports = router;
