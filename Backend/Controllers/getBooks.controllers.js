const db = require("../DB/db.connection");

// ! Query
const QUERY = `
SELECT 
  B.ID, 
  B.TITLE, 
  B.DESCRIPTION, 
  B.AUTHOR, 
  B.BOOK_PRICE, 
  B.CATEGORY,
  A.AUTHOR_DESCRIPTION,
  A.AUTHOR_ID,
  A.AUTHOR_IMAGE_URL,
  A.AUTHOR_RATING,
  BI.IMAGE_URL 
FROM books B 
LEFT JOIN BOOK_IMAGES BI 
ON B.ID = BI.BOOK_ID LEFT JOIN AUTHOR_DETAILS A 
  ON B.AUTHOR = A.AUTHOR_NAME;
`;

// Get all books
exports.getBooks = (req, res) => {
  const query = QUERY;

  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    const books = data.map((item) => ({
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
    }));

    return res.status(200).json({ success: true, books });
  });
};

// Get a book by ID
exports.getBookById = (req, res) => {
  const { id } = req.params;
  const query = QUERY + " WHERE B.ID = ?";

  db.query(query, [id], (err, data) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });
    if (data.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    return res.status(200).json({ success: true, data: data[0] });
  });
};

// Delete a book by ID
exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM books WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err)
      return res.status(500).json({ success: false, error: err.message });
    if (result.affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    return res
      .status(200)
      .json({ success: true, message: "Book deleted successfully" });
  });
};

// Update book details
exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { title, author, description, price, images } = req.body; // images is an array

  const updateBookQuery =
    "UPDATE books SET title = ?, author = ?, description = ?, book_price = ? WHERE id = ?";
  db.query(
    updateBookQuery,
    [title, author, description, price, id],
    (err, result) => {
      if (err)
        return res.status(500).json({ success: false, error: err.message });
      if (result.affectedRows === 0)
        return res
          .status(404)
          .json({ success: false, message: "Book not found" });

      if (images && Array.isArray(images)) {
        const insertImageQuery =
          "UPDATE book_images SET image_url = ? WHERE book_id = ?";

        const jsonImages = JSON.stringify(images);

        db.query(insertImageQuery, [jsonImages, id], (err, result) => {
          if (err)
            return res.status(500).json({ success: false, error: err.message });
          if (result.affectedRows === 0)
            return res
              .status(404)
              .json({ success: false, message: "Book not found" });
          return res.status(200).json({
            success: true,
            message: "Book & Images updated successfully",
          });
        });
      } else {
        res
          .status(200)
          .json({ success: true, message: "Book updated successfully" });
      }
    }
  );
};

exports.postBooks = (req, res) => {
  if (!req.body)
    return res
      .status(400)
      .json({ success: false, message: "Please provide a book" });

  const { title, author, description, price, category, images } = req.body;

  // Check if 'images' is a valid array of non-empty strings
  if (
    !Array.isArray(images) ||
    images.length === 0 ||
    images.some((image) => typeof image !== "string" || image.trim() === "")
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid or empty image URLs provided.",
    });
  }

  const queryBook =
    "INSERT INTO BOOKS (TITLE, DESCRIPTION, AUTHOR, BOOK_PRICE, CATEGORY) VALUE (?, ?, ?, ?, ?)";

  db.query(
    queryBook,
    [title, description, author, price, category],
    (err, result) => {
      if (err)
        return res.status(500).json({ success: false, error: err.message });

      if (result.affectedRows === 0)
        return res
          .status(404)
          .json({ success: false, message: "Book not found" });

      const queryImage =
        "INSERT INTO BOOK_IMAGES (BOOK_ID, IMAGE_URL) VALUES (?, ?)";

      const jsonImages = JSON.stringify(images);
      db.query(queryImage, [result.insertId, jsonImages], (err, result) => {
        if (err)
          return res.status(500).json({ success: false, error: err.message });

        if (result.affectedRows === 0)
          return res
            .status(404)
            .json({ success: false, message: "Images not added" });

        return res.status(201).json({
          success: true,
          message: "Book and images added successfully",
          bookId: result.insertId,
        });
      });
    }
  );
};
