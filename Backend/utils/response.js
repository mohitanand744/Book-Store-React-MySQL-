// Success response
function successResponse(
  res,
  statusCode,
  message,
  data = {},
  redirectUrl = null
) {
  if (redirectUrl) {
    return res.redirect(redirectUrl);
  }

  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

// Error response
function errorResponse(
  res,
  statusCode,
  message,
  error = null,
  redirectUrl = null
) {
  console.log(`Error: ${error}` || message || `${statusCode} Error`);

  if (redirectUrl) {
    return res.redirect(redirectUrl);
  }

  return res.status(statusCode).json({
    success: false,
    message,
    error,
  });
}

module.exports = { successResponse, errorResponse };
