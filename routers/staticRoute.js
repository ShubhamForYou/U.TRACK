const express = require("express");
const validateAccessToken = require("../middlewares/validateAccessToken");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/userdashboard", validateAccessToken, (req, res) => {
  res.render("userDashBoard", { userName: req.user.name });
});
module.exports = router;
