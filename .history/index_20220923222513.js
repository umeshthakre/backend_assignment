const express = require("express");

const app = express();

const mongoose = required(
  "mongodb+srv://testuser:testest@cluster0.utedm.mongodb.net/?retryWrites=true&w=majority"
);

app.use("/", (req, res) => {
  return res.json({ name: "umesh" });
});

app.listen(5000, (req, res) => {
  console.log("server is running on " + 5000);
});
