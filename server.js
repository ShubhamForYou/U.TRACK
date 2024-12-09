const express = require("express");
const app = express();
const env = require("dotenv").config();
const connectDB = require("./connect");
const urlRouter = require("./routers/url");
const userRouter = require("./routers/user");
const redirectUrlRouter = require("./routers/urlRedirect");

// DB connection
connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api/url", urlRouter);
app.use("/api/user", userRouter);
app.use("/", redirectUrlRouter);

// app listening
app.listen(process.env.PORT, () => {
  console.log(`server is listening on PORT: ${process.env.PORT}`);
});
