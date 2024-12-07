const { findOne } = require("../models/url");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

const singIn = async (req, res) => {
  try {
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
    console.log(hashPassword);
    const newUser = await userModel.create({
      name,
      username,
      email,
      password: hashPassword,
    });
    res.status(201).json({ msg: `${newUser.name} welcome to U.track` });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // all fields mandatory
  if (!email || !password) {
    res.status(400);
    throw new Error("Both fields are mandatory");
  }
  //  user registered or not
  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("user not registered");
  }
  if (await bcrypt.compare(password, user.password)) {
    res
      .status(200)
      .json({ msg: `${user.name} log-in to U.track successfully` });
  } else {
    res.status(401);
    throw new Error("email or password is invalid");
  }
});
module.exports = { singIn, logIn };
