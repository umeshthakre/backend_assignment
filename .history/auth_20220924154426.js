const jwt = require("jsonwebtoken");

const isAuthorised = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(403).send({ mesg: "unAuthorised please login" });
  }
};
