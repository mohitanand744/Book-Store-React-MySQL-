import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Auth/Pages/Login";
import Layout from "../Layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/books" element={<Layout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
