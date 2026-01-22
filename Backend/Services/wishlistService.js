const { findUserById } = require("../Models/userModel");
const { findBookById } = require("./bookService");
const db = require("../Config/db.connection");

const addToWishlistService = async (userId, bookId) => {
  try {
    // 1. Input validation
    if (!userId || !bookId) {
      return {
        success: false,
        message: "User ID and Book ID are required",
        code: "VALIDATION_ERROR",
      };
    }

    // 2. Check user exists
    const userExists = await findUserById(userId);
    if (!userExists) {
      return {
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      };
    }

    // 3. Check book exists
    const bookExists = await findBookById(bookId);
    if (!bookExists) {
      return {
        success: false,
        message: "Book not found",
        code: "BOOK_NOT_FOUND",
      };
    }

    // 4. Check existing entry
    const [existingEntries] = await db.query(
      "SELECT id, status FROM wishlists WHERE user_id = ? AND book_id = ?",
      [userId, bookId],
    );

    if (existingEntries.length > 0) {
      // Toggle status (ACTIVE/INACTIVE)
      const entry = existingEntries[0];
      const newStatus = entry.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      await db.query("UPDATE wishlists SET status = ? WHERE id = ?", [
        newStatus,
        entry.id,
      ]);

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

    // 5. Insert new entry
    const [result] = await db.query(
      "INSERT INTO wishlists (user_id, book_id, status, created_at) VALUES (?, ?, 'ACTIVE', NOW())",
      [userId, bookId],
    );

    return {
      success: true,
      message: "Book added to wishlist successfully",
      action: "ADDED",
      status: "ACTIVE",
      wishlistId: result.insertId,
    };
  } catch (err) {
    console.error("Error in wishlist operation:", err);

    // Handle specific error cases
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

module.exports = { addToWishlistService };
