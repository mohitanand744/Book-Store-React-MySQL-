import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./Slices/BooksSlice.js";
import authReducer from "./Slices/authSlice.js";
import wishlistsReducer from "./Slices/wishlistSlice.js";

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
    wishlists: wishlistsReducer,
  },
});

export default store;
