const express = require("express");
const redirectUrl = require("../controllers/urlRedirect");
const router = express.Router();

router.get("/:shortId", redirectUrl);

module.exports = router;
