const jwt = require("jsonwebtoken");
const { errorResponse, successResponse } = require("../utils/response");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return errorResponse(res, 401, "Unauthorized Access");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        path: "/",
      });

      return errorResponse(res, 401, "Session expired. Please login again.", {
        expired: true,
        name: "TokenExpiredError",
      });
    }
    return errorResponse(res, 401, "Unauthorized Access", error);
  }
};

module.exports = verifyToken;
