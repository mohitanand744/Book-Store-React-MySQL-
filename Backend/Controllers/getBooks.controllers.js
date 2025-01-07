const db = require("../DB/db.connection");

// ! Query
const QUERY = `
SELECT 
  B.ID AS BOOK_ID, 
  B.TITLE, 
  B.DESCRIPTION, 
  B.AUTHOR, 
  B.BOOK_PRICE, 
  B.CATEGORY, 
  BI.IMAGE_URL 
FROM BOOKS B 
LEFT JOIN BOOK_IMAGES BI 
ON B.ID = BI.BOOK_ID
`;

// Get all books
exports.getBooks = (req, res) => {
  const query = QUERY;

  db.query(query, (err, data) => {
    console.log(data);

    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    const books = data.map((item) => ({
      book_id: item.BOOK_ID,
      title: item.TITLE,
      description: item.DESCRIPTION,
      author: item.AUTHOR,
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

exports.postBooks = (res, req) => {
  const { title, author, description, price, category } = req.body;
  const query =
    "INSERT INTO BOOKS (TITLE, DESCRIPTION, AUTHOR, BOOK_PRICE, CATEGORY) VALUE (?, ?, ?, ?)";

  db.query(
    query,
    [title, author, description, price, category],
    (err, result) => {
      if (err)
        return res.status(500).json({ success: false, error: err.message });
      return res
        .status(201)
        .json({ message: "Book added successfully", bookId: result.insertId });
    }
  );
};
