import { useDispatch, useSelector } from "react-redux";
import {
  loginSuccess,
  logoutSuccess,
  logoutThunk,
  updateUserData,
  validateToken,
} from "../store/Redux/Slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const loginStatusSuccess = (userData, token) => {
    dispatch(loginSuccess({ user: userData, token }));
  };

  const logoutStatusSuccess = (logoutReason) => {
    navigate("/nextChapter");
    dispatch(logoutThunk(logoutReason));
    toast.success("Logout successful!");
  };

  const setUpdateUserData = (userData) => {
    dispatch(updateUserData(userData));
  };

  const getUserUpdatedDetails = async () => {
    if (auth.token) {
      dispatch(validateToken());
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
