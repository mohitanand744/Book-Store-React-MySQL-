// controllers/book.controllers.js
const {
  findAllBooks,
  findBookById,
  deleteBook,
  updateBook,
  updateImages,
  insertBook,
  insertImages,
} = require("../Services/bookService");
const { formatBook } = require("../utils/formatter");
const { errorResponse, successResponse } = require("../utils/response");

// Reusable helpers
const handleError = (res, err) => {
  if (err.code === "ER_DUP_ENTRY")
    return errorResponse(res, 400, "Duplicate entry", err.sqlMessage);
  return errorResponse(res, 500, "Internal Server Error", err.message);
};
const notFound = (res, msg = "Book not found") => errorResponse(res, 404, msg);

// ==========================
// 📚 Get all books
// ==========================
exports.getBooks = async (req, res) => {
  try {
    const [rows] = await findAllBooks();
    if (!rows.length) return notFound(res);
    successResponse(
      res,
      200,
      "Books fetched successfully",
      rows.map(formatBook)
    );
  } catch (err) {
    handleError(res, err);
  }
};

// ==========================
// 📖 Get a book by ID
// ==========================
exports.getBookById = async (req, res) => {
  try {
    const [rows] = await findBookById(req.params.id);
    if (!rows.length) return notFound(res);
    successResponse(
      res,
      200,
      "Book fetched successfully",
      rows.map(formatBook)
    );
  } catch (err) {
    handleError(res, err);
  }
};

// ==========================
// 🗑️ Delete a book
// ==========================
exports.deleteBook = async (req, res) => {
  try {
    const [result] = await deleteBook(req.params.id);
    if (!result.affectedRows) return notFound(res);
    successResponse(res, 200, "Book deleted successfully");
  } catch (err) {
    handleError(res, err);
  }
};

// ==========================
// ✏️ Update book details
// ==========================
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, price, images } = req.body;
  const connection = await require("../Config/db.connection").getConnection();

  try {
    await connection.beginTransaction();

    const [bookResult] = await updateBook(
      title,
      author,
      description,
      price,
      id
    );
    if (!bookResult.affectedRows) return notFound(res);

    if (images?.length) await updateImages(id, images);

    await connection.commit();
    successResponse(res, 200, "Book updated successfully");
  } catch (err) {
    await connection.rollback();
    handleError(res, err);
  } finally {
    connection.release();
  }
};

// ==========================
// ➕ Add new book
// ==========================
exports.postBooks = async (req, res) => {
  if (!req.body) return errorResponse(res, 400, "Please provide a book");

  const { title, author, description, price, category, images } = req.body;
  if (!Array.isArray(images) || !images.length)
    return errorResponse(res, 400, "Please provide at least one image URL");

  try {
    const [bookResult] = await insertBook(
      title,
      description,
      author,
      price,
      category
    );
    await insertImages(bookResult.insertId, images);
    successResponse(res, 201, "Book added successfully", {
      bookId: bookResult.insertId,
    });
  } catch (err) {
    handleError(res, err);
  }
};
