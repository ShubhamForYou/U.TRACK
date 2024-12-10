const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateAccessToken = async (req, res, next) => {
  let authHeader = req.headers.authorization || req.header.Authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401);
      throw new Error("Unauthorized user");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthorized user");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401);
    throw new Error("Unauthorized user");
  }
};
module.exports = validateAccessToken;
