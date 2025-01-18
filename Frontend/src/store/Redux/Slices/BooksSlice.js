import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/api";

export const fetchAllBooks = createAsyncThunk(
  "fetchAllBooks",
  async (_, thunkAPI) => {
    try {
      const responce = await axiosInstance.get("/api/books/");
      return responce.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.responce?.data?.message || "Failed to fetch books"
      );
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchAllBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookSlice.reducer;
