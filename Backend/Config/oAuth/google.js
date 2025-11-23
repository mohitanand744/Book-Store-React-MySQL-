const { Google } = require("arctic");

const google = new Google(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${process.env.BACKEND_BASE_URL}/api/${process.env.API_VERSION}/auth/google/callback`
);

module.exports = google;
