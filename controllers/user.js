const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const urlModel = require("../models/url");
// @desc user sign-in
// @route POST /api/user/signin
// @access public
const signIn = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  //  all fields mandatory
  if (!name || !username || !email || !password) {
    return res.render("signin", { errMsg: "all fields are mandatory" });
  }
  //   user already register
  if (await userModel.findOne({ email })) {
    return res.render("login", { errMsg: "user already register" });
  }
  //   password hashing
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    username,
    email,
    password: hashPassword,
  });
  //  login first
  return res.redirect("/login");
});
// @desc user log-in
// @route POST /api/user/login
// @access public
const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // all fields require
  if (!email || !password) {
    return res.render("login", { errMsg: "All fields are Mandatory" });
  }
  const user = await userModel.findOne({ email });
  // user not registered
  if (!user) {
    return res.render("signin", { errMsg: "User is not registered" });
  }

  // comparing password
  if (await bcrypt.compare(password, user.password)) {
    // if password is correct then create access-token for user
    const accessToken = await jwt.sign(
      {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30m",
      }
    );
    // Set the access token in the header
    // res.setHeader("Authorization", `Bearer ${accessToken}`);

    // Store the access token in a httpOnly cookie
    res.cookie("Authorization", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    // if all good render user dash-board
    const urlEntries = await urlModel.find({ createdBy: user.id });
    return res.render("userDashBoard", {
      userAllUrl: urlEntries,
      userName: user.name,
    });
  } else {
    return res.render("login", { errMsg: "Invalid email or password" });
  }
});
module.exports = { signIn, logIn };
