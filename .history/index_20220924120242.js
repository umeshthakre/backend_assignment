require("dotenv").config();
const express = require("express");
const { PORT } = process.env;
const { MONGODB_URL } = process.env;
const User = require("./models/User");
const app = express();

const mongoose = require("mongoose");

app.use(express.json());

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  return res.send("<h1>hiii</h1>");
});

app.post("/api/register", (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!(email && password && firstname && lastname)) {
    return res.status(400).send({ mesg: "All fields are required" });
  }

  const existingUser = User.find({ email });

  if (existingUser) {
    return res.status(401).send({ mesg: "user already exists" });
  }
});

app.listen(PORT, (req, res) => {
  console.log("server is running on " + PORT);
});
