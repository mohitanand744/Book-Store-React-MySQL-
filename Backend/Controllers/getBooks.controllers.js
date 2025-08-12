const db = require("../DB/db.connection");

const BASE_QUERY = `
  SELECT 
    B.ID, B.TITLE, B.DESCRIPTION, B.AUTHOR, B.BOOK_PRICE, B.CATEGORY,
    A.AUTHOR_DESCRIPTION, A.AUTHOR_ID, A.AUTHOR_IMAGE_URL, A.AUTHOR_RATING,
    BI.IMAGE_URL 
  FROM books B 
  LEFT JOIN book_images BI ON B.ID = BI.BOOK_ID 
  LEFT JOIN author_details A ON B.AUTHOR = A.AUTHOR_NAME
`;

// Helper function for error handling
const handleError = (res, err) =>
  res.status(500).json({ success: false, error: err.message });
const notFound = (res) =>
  res.status(404).json({ success: false, message: "Book not found" });

// Get all books
exports.getBooks = (req, res) => {
  db.query(BASE_QUERY, (err, data) => {
    if (err) return handleError(res, err);
    res.status(200).json({
      success: true,
      books: data.map((item) => ({
        book_id: item.ID,
        title: item.TITLE,
        description: item.DESCRIPTION,
        author: {
          author_id: item.AUTHOR_ID,
          author_name: item.AUTHOR,
          author_description: item.AUTHOR_DESCRIPTION,
          author_image: item.AUTHOR_IMAGE_URL,
          author_rating: item.AUTHOR_RATING,
        },
        book_price: item.BOOK_PRICE,
        category: item.CATEGORY,
        images: item.IMAGE_URL,
      })),
    });
  });
};

// Get a book by ID
exports.getBookById = (req, res) => {
  db.query(`${BASE_QUERY} WHERE B.ID = ?`, [req.params.id], (err, [data]) => {
    if (err) return handleError(res, err);
    if (!data) return notFound(res);
    res.status(200).json({ success: true, data });
  });
};

// Delete a book by ID
exports.deleteBook = (req, res) => {
  db.query("DELETE FROM books WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return handleError(res, err);
    if (!result.affectedRows) return notFound(res);
    res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  });
};

// Update book details
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, price, images } = req.body;

  try {
    const [bookResult] = await db
      .promise()
      .query(
        "UPDATE books SET title = ?, author = ?, description = ?, book_price = ? WHERE id = ?",
        [title, author, description, price, id]
      );

    if (!bookResult.affectedRows) return notFound(res);

    if (images?.length) {
      await db
        .promise()
        .query("UPDATE book_images SET image_url = ? WHERE book_id = ?", [
          JSON.stringify(images),
          id,
        ]);
    }

    res.status(200).json({
      success: true,
      message: images?.length
        ? "Book & Images updated successfully"
        : "Book updated successfully",
    });
  } catch (err) {
    handleError(res, err);
  }
};

// Add new book
exports.postBooks = async (req, res) => {
  if (!req.body)
    return res
      .status(400)
      .json({ success: false, message: "Please provide a book" });

  const { title, author, description, price, category, images } = req.body;

  if (!Array.isArray(images) || !images.length) {
    return res.status(400).json({
      success: false,
      message: "Invalid or empty image URLs provided.",
    });
  }

  try {
    const [bookResult] = await db
      .promise()
      .query(
        "INSERT INTO BOOKS (TITLE, DESCRIPTION, AUTHOR, BOOK_PRICE, CATEGORY) VALUES (?, ?, ?, ?, ?)",
        [title, description, author, price, category]
      );

    await db
      .promise()
      .query("INSERT INTO BOOK_IMAGES (BOOK_ID, IMAGE_URL) VALUES (?, ?)", [
        bookResult.insertId,
        JSON.stringify(images),
      ]);

    res.status(201).json({
      success: true,
      message: "Book and images added successfully",
      bookId: bookResult.insertId,
    });
  } catch (err) {
    handleError(res, err);
  }
};
