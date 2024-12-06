const userModel = require("../models/user");
const singIn = async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    res.status(200);
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
module.exports = singIn;
