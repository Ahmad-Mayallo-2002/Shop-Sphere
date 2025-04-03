const { verify } = require("jsonwebtoken");
require("dotenv").config();

const authorization = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(403).json({ msg: "Token is not exist or expired" });
  verify(token, process.env.jwt, (err, user) => {
    if (err) return res.status(403).json(err);
    req.user = user;
    next();
  });
};

module.exports = { authorization };
