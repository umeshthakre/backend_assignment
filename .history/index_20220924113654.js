require("dotenv").config();
const express = require("express");
const { PORT } = process.env;
const { MONGODB_URL } = process.env;

const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", (req, res) => {
  return res.send("<h1>hiii</h1>");
});

app.listen(PORT, (req, res) => {
  console.log("server is running on " + PORT);
});
