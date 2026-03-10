const {
  getAllCategoriesService,
  getUserCategoriesService,
} = require("../Services/categoryService");
const handleDbError = require("../utils/handleDbError");
const { errorResponse, successResponse } = require("../utils/response");

const getAllCategoriesController = async (req, res, next) => {
  try {
    const categories = await getAllCategoriesService();

    if (!categories) {
      return errorResponse(res, 404, "Categories not found");
    }

    successResponse(res, 200, "", categories);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

const getUserCategoriesController = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return errorResponse(res, 401, "User not found");
    }

    const categories = await getUserCategoriesService(userId);

    successResponse(res, 200, "", categories);
  } catch (error) {
    handleDbError(error, res, next);
  }
};

module.exports = {
  getAllCategoriesController,
  getUserCategoriesController,
};
