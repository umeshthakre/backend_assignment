require("dotenv").config();
const express = require("express");
const { PORT } = process.env;

const app = express();

const mongoose = require("mongoose");

app.use("/", (req, res) => {
  return res.json({ name: "umesh" });
});

app.listen(PORT, (req, res) => {
  console.log("server is running on " + PORT);
});
