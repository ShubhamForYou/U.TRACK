const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
// @desc user sign-in
// @route POST /api/user/signin
// @access public
const signIn = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  //  all fields mandatory
  if (!name || !username || !email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  //   user already register
  if (await userModel.findOne({ email })) {
    res.status(400);
    throw new Error("user already register");
  }
  //   password hashing
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    username,
    email,
    password: hashPassword,
  });
  res.status(201).json({ msg: `${newUser.name} welcome to U.track` });
});
// @desc user log-in
// @route POST /api/user/login
// @access public
const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // all fields require
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const user = await userModel.findOne({ email });
  // user not registered
  if (!user) {
    res.status(401);
    throw new Error("user is not registered ");
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
        expiresIn: "10m",
      }
    );
    res
      .status(200)
      .json({ msg: ` ${user.name} log-in to U.Track`, accessToken });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
module.exports = { signIn, logIn };
