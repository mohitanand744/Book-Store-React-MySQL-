const { findUserById } = require("../Models/userModel");
const { getBookById } = require("./bookService");
const {
  findWishlistEntry,
  updateWishlistStatus,
  insertWishlist,
  getWishlistBooksByUserId,
} = require("../Models/wishlistModel");
const { formatBook } = require("../utils/formatter");

const addToWishlistService = async (userId, bookId) => {
  try {
    if (!userId || !bookId) {
      return {
        success: false,
        message: "User ID and Book ID are required",
        code: "VALIDATION_ERROR",
      };
    }

    const userExists = await findUserById(userId);
    if (!userExists) {
      return {
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      };
    }

    const bookExists = await getBookById(bookId);
    if (!bookExists) {
      return {
        success: false,
        message: "Book not found",
        code: "BOOK_NOT_FOUND",
      };
    }

    const existingEntries = await findWishlistEntry(userId, bookId);

    if (existingEntries.length > 0) {
      const entry = existingEntries[0];
      const newStatus = entry.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      await updateWishlistStatus(entry.id, newStatus);

      return {
        success: true,
        message:
          newStatus === "ACTIVE"
            ? "Book added back to wishlist"
            : "Book removed from wishlist",
        action: "TOGGLED",
        status: newStatus,
        wishlistId: entry.id,
      };
    }

    const result = await insertWishlist(userId, bookId);

    return {
      success: true,
      message: "Book added to wishlist successfully",
      action: "ADDED",
      status: "ACTIVE",
      wishlistId: result.insertId,
    };
  } catch (err) {
    console.error("Error in wishlist operation:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return {
        success: false,
        message: "Book is already in wishlist",
        code: "DUPLICATE_ENTRY",
      };
    }

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return {
        success: false,
        message: "Invalid user or book reference",
        code: "FOREIGN_KEY_VIOLATION",
      };
    }

    return {
      success: false,
      message: "Failed to process wishlist operation",
      code: "INTERNAL_ERROR",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    };
  }
};

const getWishlistService = async (userId) => {
  try {
    if (!userId) {
      return { success: false, message: "User ID required" };
    }

    const userExists = await findUserById(userId);
    if (!userExists) {
      return { success: false, message: "User not found" };
    }

    const [wishlist] = await getWishlistBooksByUserId(userId);

    return {
      success: true,
      count: wishlist.length,
      data: wishlist.map(formatBook),
    };
  } catch (err) {
    console.error("Wishlist Service Error:", err);
    return { success: false, message: "Failed to fetch wishlist" };
  }
};

module.exports = { addToWishlistService, getWishlistService };
