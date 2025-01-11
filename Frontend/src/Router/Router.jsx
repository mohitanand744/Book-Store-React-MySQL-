import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Pages/Login";
import Layout from "../Layout";
import Home from "../Pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bookstore" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
