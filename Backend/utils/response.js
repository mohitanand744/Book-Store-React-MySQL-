// Success response
function successResponse(res, statusCode, message, data = {}) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

// Error response
function errorResponse(res, statusCode, message, error = null) {
  console.log(`Error: ${error}` || message || `${statusCode} Error`);
  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
}

module.exports = { successResponse, errorResponse };
