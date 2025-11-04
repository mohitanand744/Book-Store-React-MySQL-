const { errorResponse } = require("./response");

function handleDbError(error, res, next) {
  if (error.code === "ER_NO_SUCH_TABLE") {
    console.log(error);
    if (next) return next(error);
  }

  const message = error.customMessage
    ? error.message
    : "Server Error - Please try again later";

  return errorResponse(res, 400, message, error);
}

module.exports = handleDbError;
