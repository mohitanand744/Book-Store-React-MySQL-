import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout, getUserDetails } from "../../../utils/apis/authApi";

// ---------------------- VALIDATE TOKEN ---------------------- //
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { getState, rejectWithValue }) => {
    const { logoutReason } = getState().auth;

    // Prevent repeat calls if already logged out due to expired token
    if (logoutReason === "tokenExpired") return rejectWithValue("No token");

    try {
      const response = await getUserDetails();
      return response.data;
    } catch {
      return rejectWithValue("Token invalid");
    }
  }
);

// ---------------------- LOGOUT ---------------------- //
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (logoutReason, { dispatch, rejectWithValue }) => {
    try {
      await logout();
      dispatch(logoutSuccess(logoutReason));
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  }
);

// ---------------------- INITIAL STATE ---------------------- //
const getInitialState = () => {
  return {
    userData: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    logoutReason: null,
    isAuthenticating: false,
  };
};

// ---------------------- SLICE ---------------------- //
const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginSuccess: (state, action) => {
      state.userData = action.payload.user;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },

    logoutSuccess: (state, action) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.logoutReason = action.payload || null;
      state.error = null;
    },

    updateUserData: (state, action) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
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
        state.isAuthenticating = true;
        state.error = null;
      })

      .addCase(validateToken.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.error = null;
      })

      .addCase(validateToken.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.isAuthenticated = false;
        state.userData = null;
        state.logoutReason = "tokenExpired";
        state.error = action.payload;
      })

      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.userData = null;
      })

      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
