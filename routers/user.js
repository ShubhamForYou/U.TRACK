const express = require("express");
const singIn = require("../controllers/user");
const router = express.Router();

router.post("/singIn", singIn);
module.exports = router;
