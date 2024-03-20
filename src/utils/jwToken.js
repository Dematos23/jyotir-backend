const jwt = require("jsonwebtoken");

function jwToken(json) {
  const token = jwt.sign(json,
    process.env.JWT_SECRET,
    { expiresIn: "1d" });
  return token;
}

module.exports = jwToken;
