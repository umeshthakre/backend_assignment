const jwt = require("jsonwebtoken");

const isAuthorised = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(403).send({ mesg: "unAuthorised please login" });
  }
  try {
    const val = jwt.verify(token, process.env.SECRET_KEY);
    console.log(val);
  } catch (error) {
    return res.status(401).send("invalid token");
  }
  return next();
};
