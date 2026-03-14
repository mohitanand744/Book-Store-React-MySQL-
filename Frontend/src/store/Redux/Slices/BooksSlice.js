import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBooks } from "../../../utils/apis/booksApis";

const initialState = {
  books: [],
  nextCursor: null,
  hasMore: false,
  loading: false,
  error: null,
};

export const fetchAllBooks = createAsyncThunk(
  "fetchAllBooks",
  async (filters, thunkAPI) => {
    try {
      const response = await getAllBooks(filters);

      return response.data; // This is result object from backend
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
        const { data, nextCursor, hasMore } = action.payload;

        // If it's a pagination fetch (cursor exists in args), append data
        if (action.meta.arg.cursor) {
          state.books = [...state.books, ...data];
        } else {
          // Fresh fetch
          state.books = data;
        }

        state.nextCursor = nextCursor;
        state.hasMore = hasMore;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export default bookSlice.reducer;
