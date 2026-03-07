const { getAllCategoriesService } = require("../Services/categoryService");
const handleDbError = require("../utils/handleDbError");
const { errorResponse, successResponse } = require("../utils/response");

const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategoriesService();

    if (!categories) {
      return errorResponse(res, 404, "Categories not found");
    }

    successResponse(res, 200, "", categories);
  } catch (error) {
    handleDbError(error, res);
  }
};

module.exports = {
  getAllCategoriesController,
};
