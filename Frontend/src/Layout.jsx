import React from "react";
import Navbar from "./components/Common/Navbars/Nav";
import DiscountHeader from "./components/Common/Navbars/DiscountHeader";
import { Outlet } from "react-router-dom";
import Footer from "./components/Common/Footers/Footer";

const Layout = () => {
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
