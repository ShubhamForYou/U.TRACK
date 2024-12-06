const express = require("express");
const app = express();
const env = require("dotenv").config();
const connectDB = require("./connect");
const urlRouter = require("./routers/url");

// DB connection
connectDB(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.log(`error: ${err}`);
  });

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/api", urlRouter);

// app listening
app.listen(process.env.PORT, () => {
  console.log(`server is listening on PORT: ${process.env.PORT}`);
});
