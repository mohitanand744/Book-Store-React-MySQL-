const { errorResponse } = require("../utils/response");

function handleDbError(error, res, next) {
  /* if (error.code === "ER_NO_SUCH_TABLE") {
    console.log(error);
    if (next) return next(error);
  } */
  return errorResponse(
    res,
    400,
    "Server Error - Please try again later",
    error
  );
}

module.exports = handleDbError;
