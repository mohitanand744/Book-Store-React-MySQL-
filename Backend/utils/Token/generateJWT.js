const jwt = require("jsonwebtoken");

const generateJWT = (payload, secret, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

module.exports = generateJWT;
