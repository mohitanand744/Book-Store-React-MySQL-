const jwt = require("jsonwebtoken");

const optionalVerifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) return next();

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
  } catch (error) {
    console.log(error);
  }

  next();
};

module.exports = optionalVerifyToken;
