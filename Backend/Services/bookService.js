// services/bookService.js
const db = require("../Config/db.connection");

const BASE_QUERY = `
  SELECT 
    B.ID, B.TITLE, B.DESCRIPTION, B.AUTHOR, B.BOOK_PRICE, B.CATEGORY,
    A.AUTHOR_DESCRIPTION, A.AUTHOR_ID, A.AUTHOR_IMAGE_URL, A.AUTHOR_RATING,
    BI.IMAGE_URL 
  FROM books B 
  LEFT JOIN book_images BI ON B.ID = BI.BOOK_ID 
  LEFT JOIN author_details A ON B.AUTHOR = A.AUTHOR_NAME
`;

exports.findAllBooks = () => db.query(BASE_QUERY);

exports.findBookById = (id) => db.query(`${BASE_QUERY} WHERE B.ID = ?`, [id]);

exports.deleteBook = (id) => db.query("DELETE FROM books WHERE id = ?", [id]);

exports.updateBook = (title, author, description, price, id) =>
  db.query(
    "UPDATE books SET title = ?, author = ?, description = ?, book_price = ? WHERE id = ?",
    [title, author, description, price, id]
  );

exports.updateImages = (id, images) =>
  db.query("UPDATE book_images SET image_url = ? WHERE book_id = ?", [
    JSON.stringify(images),
    id,
  ]);

exports.insertBook = (title, description, author, price, category) =>
  db.query(
    "INSERT INTO BOOKS (TITLE, DESCRIPTION, AUTHOR, BOOK_PRICE, CATEGORY) VALUES (?, ?, ?, ?, ?)",
    [title, description, author, price, category]
  );

exports.insertImages = (bookId, images) =>
  db.query("INSERT INTO BOOK_IMAGES (BOOK_ID, IMAGE_URL) VALUES (?, ?)", [
    bookId,
    JSON.stringify(images),
  ]);
