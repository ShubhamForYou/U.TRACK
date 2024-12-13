const express = require("express");
const app = express();
const env = require("dotenv").config();
const connectDB = require("./connect");
const path = require("path");
const urlRouter = require("./routers/url");
const userRouter = require("./routers/user");
const redirectUrlRouter = require("./routers/urlRedirect");
const StaticRoutes = require("./routers/staticRoute");

// DB connection
connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  });

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/url", urlRouter);
app.use("/api/user", userRouter);
app.use("/r", redirectUrlRouter);
app.use("/", StaticRoutes);

// app listening
app.listen(process.env.PORT, () => {
  console.log(`server is listening on PORT: ${process.env.PORT}`);
});
