const express = require("express");

const app = express();

app.use("/", (req, res) => {
  return res.json({ name: "umesh" });
});

app.listen(5000, (req, res) => {
  console.log("server is running on " + 5000);
});
