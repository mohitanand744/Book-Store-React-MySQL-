const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["Authorization"].split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access - No Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized Access - Invalid Token" });
  }
};

module.exports = verifyToken;
