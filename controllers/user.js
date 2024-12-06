const { findOne } = require("../models/url");
const userModel = require("../models/user");
const singIn = async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const newUser = await userModel.create({
    name,
    username,
    email,
    password,
  });
  res.status(201).json({ msg: `${newUser.name} welcome to U.track` });
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Both fields are mandatory");
  }
  const flag = await userModel.findOne({ email });
  if (!flag) {
    res.status(404);
    throw new Error("user not registered");
  }

  const user = await userModel.findOne({ email, password });
  if (!user) {
    res.status(401);
    throw new Error("email or password is invalid");
  }
  res.status(200).json({ msg: `${user.name} log-in to U.track successfully` });
};
module.exports = { singIn, logIn };
