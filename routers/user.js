const express = require("express");
const { singIn, logIn } = require("../controllers/user");
const router = express.Router();

router.post("/singIn", singIn);
router.post("/logIn", logIn);
module.exports = router;
