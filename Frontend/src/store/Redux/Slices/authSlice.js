import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logout } from "../../../utils/apis/authApis";
import { getUserDetails } from "../../../utils/apis/userApis";

// ---------------------- VALIDATE TOKEN ---------------------- //
export const validateToken = createAsyncThunk(
  "auth/validateToken",
  async (_, { getState, rejectWithValue }) => {
    const { logoutReason } = getState().auth;

    if (logoutReason === "tokenExpired") return rejectWithValue("No token");

    try {
      const response = await getUserDetails();
      return response.data;
    } catch {
      return rejectWithValue("Token invalid");
    }
  },
);

// ---------------------- LOGOUT ---------------------- //
export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (logoutReason, { rejectWithValue }) => {
    try {
      await logout();
      return logoutReason;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Logout failed");
    }
  },
);

// ---------------------- INITIAL STATE ---------------------- //
const getInitialState = () => {
  return {
    userData: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    logoutReason: "",
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
      state.logoutReason = "";
      state.error = null;
    },

    logoutSuccess: (state, action) => {
      state.userData = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.logoutReason = "";
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
        state.error = null;
      })
      .addCase(validateToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userData = action.payload;
        state.error = null;
      })
      .addCase(validateToken.rejected, (state, action) => {

        if (action.payload === "Token invalid") {
          state.isAuthenticated = false;
          state.userData = null;
          state.logoutReason = "tokenExpired";
        }

        state.error = action.payload;
      })
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.userData = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.logoutReason = action.payload || "manual";
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


