exports.formatBook = (item) => ({
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
});
