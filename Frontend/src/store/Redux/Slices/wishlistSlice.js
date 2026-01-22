import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishlist } from "../../../utils/apis/ordersApi";

export const toggleWishlist = createAsyncThunk(
  "toggleWishlist",
  async (bookId, { rejectWithValue }) => {
    try {
      const response = await addToWishlist(bookId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to toggle wishlist",
      );
    }
  },
);

const initialState = {
  wishlists: null,
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(toggleWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(toggleWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      });
  },
});

export default wishlistSlice.reducer;
