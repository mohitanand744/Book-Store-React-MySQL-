import { useEffect } from "react";
import Navbar from "./components/Common/Navbars/Nav";
import DiscountHeader from "./components/Common/Navbars/DiscountHeader";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Common/Footers/Footer";
import { useAxiosLoader } from "./services/api";

const Layout = () => {
  const pathName = useLocation().pathname;
  useAxiosLoader();

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
