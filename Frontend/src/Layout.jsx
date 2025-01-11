import React from "react";
import Navbar from "./components/Common/Navbars/Nav";
import DiscountHeader from "./components/Common/Navbars/DiscountHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <DiscountHeader />
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout;
