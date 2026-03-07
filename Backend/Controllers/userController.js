const { validationResult } = require("express-validator");
const {
  deleteFromCloudinary,
  profileCompletionDetails,
} = require("../Helper/methods");
const {
  findUserById,
  updateUserPicturePublicId,
} = require("../Models/userModel");
const {
  updateProfilePic,
  updateUserDetailsService,
} = require("../Services/userService");
const { uploadFromBuffer } = require("../utils/cloudinaryUpload");
const handleDbError = require("../utils/handleDbError");
const { errorResponse, successResponse } = require("../utils/response");
const { formatUser } = require("../utils/formatter");

const uploadProfilePic = async (req, res, next) => {
  try {
    const file = req.file;
    const userId = req.userId;

    if (!file) {
      return errorResponse(res, 400, "Please upload an image file");
    }

    const user = await findUserById(userId);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    if (user?.profile_pic_public_id) {
      await deleteFromCloudinary(user?.profile_pic_public_id);
    }

    const { url: pictureUrl, public_id } = await uploadFromBuffer(file.buffer);

    if (!pictureUrl) {
      return errorResponse(res, 500, "Failed to upload image to cloud storage");
    }

    const result = await updateProfilePic(user.id, pictureUrl);

    await updateUserPicturePublicId(user.id, public_id);

    successResponse(res, 200, result.message, {
      profilePic: result.profilePic,
    });
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const updateUserDetailsController = async (req, res, next) => {
  console.log("uuuuuuuuuuuuuu");

  try {
    const userId = req.userId;
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return errorResponse(res, 400, "Validation failed", error.array());
    }
    const { firstName, lastName, phone, favoriteGenres } = req.body;

    if (!userId) {
      return errorResponse(res, 401, "User not found");
    }

    if (!firstName || !lastName || !phone) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const result = await updateUserDetailsService(
      userId,
      firstName,
      lastName,
      phone,
      favoriteGenres,
    );

    if (result.success) {
      successResponse(res, 200, result.message);
    } else {
      errorResponse(res, 400, result.message);
    }
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const user = await findUserById(req.userId);

    if (!user) {
      return errorResponse(res, 400, "User not found");
    }
    console.log("User - ", user);

    const userDetails = formatUser([user]);

    const { isComplete, percentage } =
      await profileCompletionDetails(userDetails);

    successResponse(res, 200, "", { ...userDetails, isComplete, percentage });
  } catch (error) {
    console.log(error);
    handleDbError(error, res, next);
  }
};

module.exports = {
  uploadProfilePic,
  updateUserDetailsController,
  getUserProfile,
};
