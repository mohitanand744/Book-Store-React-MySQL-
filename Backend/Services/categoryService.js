const {
  getAllCategories,
  getUserCategories,
} = require("../Models/categoryModel");

exports.getAllCategoriesService = async () => {
  const categories = await getAllCategories();

  console.log("categories", categories);

  if (!categories) {
    throw { status: 404, message: "Categories not found" };
  }

  return {
    success: true,
    categories: categories,
  };
};

exports.getUserCategoriesService = async (userId) => {
  const categories = await getUserCategories(userId);

  return {
    success: true,
    categories: categories ?? [],
  };
};
