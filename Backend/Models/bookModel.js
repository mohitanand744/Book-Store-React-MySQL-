// models/book.model.js
const db = require("../Config/db.connection");

const BASE_QUERY = `
  SELECT 
    B.ID, B.TITLE, B.DESCRIPTION, B.AUTHOR, B.BOOK_PRICE, B.CATEGORY,
    A.AUTHOR_DESCRIPTION, A.AUTHOR_ID, A.AUTHOR_IMAGE_URL, A.AUTHOR_RATING,
    BI.IMAGE_URL,
    CASE 
      WHEN W.id IS NULL THEN false
      ELSE true
    END AS isLiked
  FROM books B 
  LEFT JOIN book_images BI ON B.ID = BI.BOOK_ID 
  LEFT JOIN author_details A ON B.AUTHOR = A.AUTHOR_NAME
  LEFT JOIN wishlists W 
    ON W.book_id = B.ID 
   AND W.user_id = ?
   AND W.status = 'ACTIVE'
`;

const findAllBooks = (userId = null) => {
  console.log("User Id", userId);

  return db.query(BASE_QUERY, [userId]);
};

const findBookById = (id, userId = null) => {
  return db.query(`${BASE_QUERY} WHERE B.ID = ?`, [id, userId]);
};

const deleteBookById = (id) => {
  return db.query("DELETE FROM books WHERE id = ?", [id]);
};

const updateBookById = (title, author, description, price, id) => {
  return db.query(
    "UPDATE books SET title = ?, author = ?, description = ?, book_price = ? WHERE id = ?",
    [title, author, description, price, id],
  );
};

const updateBookImages = (id, images) => {
  return db.query("UPDATE book_images SET image_url = ? WHERE book_id = ?", [
    JSON.stringify(images),
    id,
  ]);
};

const insertBook = (title, description, author, price, category) => {
  return db.query(
    "INSERT INTO books (title, description, author, book_price, category) VALUES (?, ?, ?, ?, ?)",
    [title, description, author, price, category],
  );
};

const insertImages = (bookId, images) => {
  return db.query(
    "INSERT INTO book_images (book_id, image_url) VALUES (?, ?)",
    [bookId, JSON.stringify(images)],
  );
};

module.exports = {
  findAllBooks,
  findBookById,
  deleteBookById,
  updateBookById,
  updateBookImages,
  insertBook,
  insertImages,
};
