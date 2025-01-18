import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Pages/Login";
import Home from "../Pages/Home";
import AllBooks from "../Pages/AllBooks";

const Layout = lazy(() => import("../Layout"));

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/bookstore"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Layout />
            </Suspense>
          }
        >
          <Route index element={<Home />} />
          <Route path="books" element={<AllBooks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
