const express = require("express");
const router = express.Router();
const {
  getBooks,
  getBookById,
  deleteBook,
  updateBook,
  postBooks,
} = require("../Controllers/booksController");
const verifyToken = require("../Middleware/verifyToken");

router.get("/", verifyToken, getBooks);
router.get("/:id", getBookById);
router.post("/", postBooks);
router.delete("/:id", deleteBook);
router.put("/:id", updateBook);

module.exports = router;
