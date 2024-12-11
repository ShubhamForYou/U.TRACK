const express = require("express");
const router = express.Router();
const validateAccessToken = require("../middlewares/validateAccessToken");
const { createUrl, getVisiterCount } = require("../controllers/url");

//set controller
router.post("/create", validateAccessToken, createUrl);

router.get("/visitorCount", validateAccessToken, getVisiterCount);

module.exports = router;
