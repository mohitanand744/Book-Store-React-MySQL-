import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "../components/Loaders/Loading";
import SignUp from "../components/Auth/Pages/SignUp";
import UserProfile from "../Pages/UserProfile";
import OrdersPage from "../Pages/OrderPage";
import { Toaster } from "sonner";
import Wishlist from "../Pages/Wishlist";
import CheckoutPage from "../Pages/CheckoutPage";
import ProtectedRoute from "./ProtectedRoute";
import TrackingPage from "../Pages/TrackingPage";
import { validateToken } from "../store/Redux/Slices/authSlice";
import { useDispatch } from "react-redux";

// Lazy-loaded components
const Login = lazy(() => import("../components/Auth/Pages/Login"));
const Layout = lazy(() => import("../Layout"));
const Home = lazy(() => import("../Pages/Home"));
const AllBooks = lazy(() => import("../Pages/AllBooks"));
const SingleBooks = lazy(() => import("../Pages/SingleBooks"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(validateToken());
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "linear-gradient(to right, #5C4C49, #D3BD9D)",
            color: "#fff",
            border: "2px solid #fff",
            padding: "8px 12px",
            minHeight: "auto",
            fontSize: "14px",
            lineHeight: "1.2",
          },
        }}
      />

      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Default landing page for all users */}
          <Route path="/nextChapter" element={<Layout />}>
            <Route index element={<Home />} />

            {/* Public routes */}
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="books" element={<AllBooks />} />
            <Route path="book/:id" element={<SingleBooks />} />

            {/* Protected routes */}
            <Route
              path="user/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="tracking/:itemId/:trackingId"
              element={<TrackingPage />}
            />
          </Route>

          {/* Fallback route */}
          {/* <Route path="*" element={<FallbackRoute />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
