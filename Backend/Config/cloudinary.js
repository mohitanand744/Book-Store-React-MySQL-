// config/cloudinary.js
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "djm2qtqpb";

module.exports = {
  cloudName: cloudName,
  baseUrl: `https://res.cloudinary.com/${cloudName}/image/upload`,

  images: {
    logo: `https://res.cloudinary.com/${cloudName}/image/upload/nextChapterLogo_czmhas.png`,
  },
};
