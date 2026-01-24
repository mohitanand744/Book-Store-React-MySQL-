import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBooks } from "../../../utils/apis/booksApi";

const initialState = {
  books: [],
  loading: false,
  error: null,
};

export const fetchAllBooks = createAsyncThunk(
  "fetchAllBooks",
  async (_, thunkAPI) => {
    try {
      const response = await getAllBooks();

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch books",
      );
    }
  },
);

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action?.payload;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export default bookSlice.reducer;
