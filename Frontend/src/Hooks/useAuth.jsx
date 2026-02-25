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

  const loginStatusSuccess = (userData, token) => {
    console.log("tttttttttttt", token);

    dispatch(loginSuccess({ user: userData, token }));
  };

  const logoutStatusSuccess = async (logoutReason) => {
    try {
      navigate("/nextChapter");
      await dispatch(logoutThunk(logoutReason)).unwrap();
      toast.success("Logout successful!");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const setUpdateUserData = (userData) => {
    dispatch(updateUserData(userData));
  };

  const getUserUpdatedDetails = async () => {
    try {
      const userData = await dispatch(validateToken()).unwrap();
      console.log("Token valid:", userData);
    } catch (err) {
      console.log("Token validation failed:", err);
    }
  };

  return {
    userData: auth.userData,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    loginStatusSuccess,
    logoutStatusSuccess,
    setUpdateUserData,
    getUserUpdatedDetails,
    logoutReason: auth.logoutReason,
  };
};

export default useAuth;
