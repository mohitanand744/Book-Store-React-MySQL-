import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToWishlist , getWishlist} from "../../../utils/apis/ordersApi";

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

export const getAllWishlists = createAsyncThunk(
  "getAllWishlists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlist();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to get wishlists",
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
      }).addCase(getAllWishlists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllWishlists.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlists = action?.payload;
        state.error = null;
      })
      .addCase(getAllWishlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload;
      })
  },
});

export default wishlistSlice.reducer;
