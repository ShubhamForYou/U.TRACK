const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateAccessToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.Authorization;
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.redirect("/login");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    return res.redirect("/login");
  }
});

//       jwt in headers
// const validateAccessToken = asyncHandler(async (req, res, next) => {
//   let authHeader = req.headers.authorization || req.headers.Authorization;

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     let token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.render("login", { errMsg: "Unauthorized user" });
//     }
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//       if (err) {
//         res.render("login", { errMsg: "Unauthorized User" });
//       }
//       req.user = decoded.user;
//       next();
//     });
//   } else {
//     return res.render("login", { errMsg: "Unauthorized user" });
//   }
// });
module.exports = validateAccessToken;
