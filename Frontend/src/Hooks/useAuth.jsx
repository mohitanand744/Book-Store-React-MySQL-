import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  logoutSuccess,
  logoutThunk,
  updateUserData,
  validateToken,
} from "../store/Redux/Slices/authSlice";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const loginStatusSuccess = (userData) => {
    dispatch(loginSuccess({ user: userData }));
  };

  const logoutStatusSuccess = async (logoutReason) => {
    try {
      await dispatch(logoutThunk(logoutReason)).unwrap();

      navigate("/nextChapter");
      toast.success("Logout successful!", {
        description:
          logoutReason === "TokenExpiredError"
            ? "Your session has expired. Please log in again."
            : "",
        id: "logout-toast",
      });
    } catch (error) {
      toast.error("Logout failed!", {
        id: "logout-toast",
      });
    }
  };

  const setUpdateUserData = (userData) => {
    dispatch(updateUserData(userData));
  };

  const getUserUpdatedDetails = async () => {
    console.log("Validating token...");
    try {
      const userData = await dispatch(validateToken()).unwrap();
      console.log("Token valid:", userData);
    } catch (err) {
      console.log("Token validation failed:", err);
    }
  };

  return {
    userData: auth.userData,
    isAuthenticated: auth.isAuthenticated,
    loginStatusSuccess,
    logoutStatusSuccess,
    setUpdateUserData,
    getUserUpdatedDetails,
    logoutReason: auth.logoutReason,
    loading: auth.loading,
  };
};

export default useAuth;


