import React, { useEffect } from "react";
import Navbar from "./components/Common/Navbars/Nav";
import DiscountHeader from "./components/Common/Navbars/DiscountHeader";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Common/Footers/Footer";
import { useAxiosLoader } from "./services/api";
import { useDispatch } from "react-redux";
import useAuth from "./Hooks/useAuth";
import { setLoading, validateToken } from "./store/Redux/Slices/authSlice";

const Layout = () => {
  const pathName = useLocation().pathname;
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  console.log(isAuthenticated);
  useAxiosLoader();

  useEffect(() => {
    dispatch(isAuthenticated ? validateToken() : setLoading(false));
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);

  return (
    <>
      <DiscountHeader />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
