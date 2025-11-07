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

// userFormatter.js
exports.formatUser = (rows) => {
  const user = rows[0];

  const date = new Date(user.created_at);
  const formattedDate = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  return {
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    userId: user.id,
    profilePic:
      user.profile_pic ||
      "https://img.freepik.com/premium-vector/human-icon_970584-3.jpg?semt=ais_hybrid&w=740&q=80",
    joinDate: formattedDate || null,
    address: [],
    phone: user.phone || null,
    orders: 0,
    wishlist: 0,
    favoriteGenres: ["Fantasy", "Mystery", "Science Fiction"],
    readingPreferences: {
      format: "Paperback",
      language: "English",
      notification: "Weekly",
    },
    recentOrders: [],
    recentWishlist: [],
  };
};
