const cloudinary = require("../Config/cloudinary");
const { formatUser } = require("../utils/formatter");

const deleteFromCloudinary = async (public_id) => {
  if (!public_id) return;

  await cloudinary.uploader.destroy(public_id);
};

const profileCompletionDetails = async (userData) => {
  const userDetails = formatUser(userData);

  const fields = [
    userDetails?.name,
    userDetails?.email,
    userDetails?.phone,
    userDetails?.gender,
    userDetails?.favoriteGenres,
    userDetails?.default_address.address,
    userDetails?.default_address.city,
    userDetails?.default_address.state,
    userDetails?.default_address.pinCode,
  ];

  const missingFields = fields.filter((field) => !field);
  const isComplete = missingFields.length === 0;
  const completed = fields.filter(Boolean).length;
  const totalFields = fields.length;
  const percentage = Math.round((completed / totalFields) * 100);

  return {
    isComplete,
    percentage,
  };
};

module.exports = { deleteFromCloudinary, profileCompletionDetails };
