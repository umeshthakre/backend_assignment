const jwt = require("jsonwebtoken");

const isAuthorised = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
};
