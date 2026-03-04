const cloudinary = require("../Config/cloudinary");

const deleteFromCloudinary = async (public_id) => {
  if (!public_id) return;

  await cloudinary.uploader.destroy(public_id);
};

const profileCompletionDetails = async (userData) => {
  const fields = [
    userData?.name,
    userData?.email,
    userData?.phone,
    userData?.gender,
    userData?.favoriteGenres,
    userData?.default_address.address,
    userData?.default_address.city,
    userData?.default_address.state,
    userData?.default_address.pinCode,
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
