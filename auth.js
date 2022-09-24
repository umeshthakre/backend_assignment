const jwt = require("jsonwebtoken");

const isAuthorised = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(403).send({ mesg: "unAuthorised please login" });
    }
    try {
      const val = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).send("invalid token");
    }
  } catch (error) {
    return res.send({ mesg: "check token" });
  }

  return next();
};

module.exports = isAuthorised;
