import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./Slices/BooksSlice.js";
import authReducer from "./Slices/authSlice.js";

const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
  },
});

export default store;
