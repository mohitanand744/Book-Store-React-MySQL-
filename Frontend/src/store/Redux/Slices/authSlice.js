import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { forgotPassword, getUserDetails } from "../../../utils/apis/authApi";
import toast from "react-hot-toast";

// Async thunk for token validation
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserDetails();

      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Token validation failed");
    }
  }
);

const getInitialState = () => {
  try {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("userData");

    return {
      userData: storedUserData ? JSON.parse(storedUserData) : null,
      token: token || null,
      isAuthenticated: token !== null,
      loading: true,
      error: null,
      logoutReason: null,
    };
  } catch (error) {
    console.error("Error loading auth state from localStorage:", error);
    return {
      userData: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      logoutReason: null,
    };
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action) => {
      console.log("Login Success:", action);

      state.userData = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.user));
    },

    logoutSuccess: (state, action) => {
      state.userData = null;
      state.loading = false;
      state.logoutReason = action.payload || null;
      state.error = null;
      state.isAuthenticated = false;
      state.token = null;

      localStorage.removeItem("token");
      localStorage.removeItem("userData");
    },
    updateUserData: (state, action) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
        localStorage.setItem("userData", JSON.stringify(state.userData));
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.error = null;

        // Update localStorage with fresh data
        localStorage.setItem("userData", JSON.stringify(action.payload));
      })
      .addCase(validateToken.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userData = null;
        state.token = null;
        logoutReason = "tokenExpired";
        state.error = action.payload;

        // Clear invalid data from localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
      });
  },
});

export const {
  loginSuccess,
  logoutSuccess,
  updateUserData,
  clearError,
  setLoading,
} = authSlice.actions;
export default authSlice.reducer;
