const {
  findUserById,
  updateUserPicture,
  updateUserDetails,
} = require("../Models/userModel");

exports.updateProfilePic = async (userId, pictureUrl) => {
  try {
    const user = await findUserById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    await updateUserPicture(userId, pictureUrl);

    return {
      success: true,
      profilePic: pictureUrl,
      message: "Profile picture updated successfully",
    };
  } catch (err) {
    console.error("Update profile pic error:", err);
    throw err.customMessage
      ? err
      : { message: "Failed to update profile picture" };
  }
};

exports.updateUserDetailsService = async (
  userId,
  firstName,
  lastName,
  phone,
  favoriteGenres,
  gender,
) => {
  try {
    const user = await findUserById(userId);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    const result = await updateUserDetails(
      userId,
      phone,
      firstName,
      lastName,
      favoriteGenres,
      gender,
    );

    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "User details updated successfully",
      };
    } else {
      throw { status: 500, message: "Failed to update user details" };
    }
  } catch (error) {
    console.error("Update user details error:", error);
    throw error.customMessage
      ? error
      : { message: "Failed to update user details" };
  }
};
