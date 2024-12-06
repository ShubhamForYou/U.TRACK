const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
