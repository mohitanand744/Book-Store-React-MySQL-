const { addToWishlistService, getWishlistService } = require("../Services/wishlistService");
const handleDbError = require("../utils/handleDbError");
const { errorResponse, successResponse } = require("../utils/response");

exports.addToWishlist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { bookId } = req.body;

    const result = await addToWishlistService(userId, bookId);

    if (!result.success) {
      errorResponse(res, 400, result.message);
      return;
    }

    successResponse(res, 200, result.message);
  } catch (err) {
    console.error(err);
    handleDbError(err, res, next);
  }
};

exports.getWishlist = async (req, res, next) => {
const userId = req.userId;

try {
  const wishlist = await getWishlistService(userId);
  successResponse(res, 200, "", wishlist);
} catch (err) {
  console.error(err);
  handleDbError(err, res, next);
}
}