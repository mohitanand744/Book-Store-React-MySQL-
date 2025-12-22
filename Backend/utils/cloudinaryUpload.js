const cloudinary = require('../Config/cloudinary');

const uploadFromUrl = async (url) => {
  try {
    const result = await cloudinary.uploader.upload(url, {
      folder: 'user_profiles',
      resource_type: 'image',
    });
    return result.secure_url; 
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return null;
  }
};
module.exports = { uploadFromUrl };