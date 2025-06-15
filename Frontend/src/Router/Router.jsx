import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Pages/Login";
import Home from "../Pages/Home";
import AllBooks from "../Pages/AllBooks";
import Loading from "../components/Loaders/Loading";
import BookstoreLoader from "../components/Loaders/bookstoreLoader";
import SingleBooks from "../Pages/SingleBooks";
import AboutUs from "../Pages/AboutUs";

const Layout = lazy(() => import("../Layout"));

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isLoading ? <Loading /> : <Login />} />
        <Route
          path="/bookstore"
          element={
            <Suspense fallback={<BookstoreLoader />}>
              <Layout />
            </Suspense>
          }
        >
          <Route index element={<Home />} />
          <Route path="aboutUs" element={<AboutUs />} />
          <Route path="books" element={<AllBooks />} />
          <Route path="book/:id" element={<SingleBooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
