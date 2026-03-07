const express = require("express");
const verifyToken = require("../Middleware/verifyToken");
const {
  getUserProfile,
  updateUserDetailsController,
  uploadProfilePic,
} = require("../Controllers/userController");
const { userUpdatedDataValidation } = require("../Validators/userValidator");
const upload = require("../Middleware/multer");
const router = express.Router();

router.get("/me", verifyToken, getUserProfile);
router.post(
  "/profile-pic",
  verifyToken,
  upload.single("profilePic"),
  uploadProfilePic,
);
router.put(
  "/profile-update",
  verifyToken,
  userUpdatedDataValidation,
  updateUserDetailsController,
);

module.exports = router;
