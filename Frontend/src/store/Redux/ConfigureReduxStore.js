import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "./Slices/BooksSlice.js";

const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

export default store;
