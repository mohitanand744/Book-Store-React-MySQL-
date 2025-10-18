const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    console.log("token", token);

    if (!token) {
      return errorResponse(res, 401, "Unauthorized Access - No Token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return errorResponse(
      res,
      401,
      "Unauthorized Access - Invalid Token",
      error
    );
  }
};

module.exports = verifyToken;
