require("dotenv").config();
const express = require("express");
const { PORT } = process.env;

const app = express();

const mongoose = require("mongoose");

app.use("/", (req, res) => {
  return res.send(<h1>hiii</h1>);
});

app.listen(PORT, (req, res) => {
  console.log("server is running on " + PORT);
});
