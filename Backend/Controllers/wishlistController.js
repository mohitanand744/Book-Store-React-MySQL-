const { addToWishlistService } = require("../Services/wishlistService");
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
