import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Loading from "../components/Loaders/Loading";
import BookstoreLoader from "../components/Loaders/bookstoreLoader";
import SignUp from "../components/Auth/Pages/SignUp";
import UserProfile from "../Pages/UserProfile";
import OrdersPage from "../Pages/OrderPage";
import { Toaster } from "react-hot-toast";
import Wishlist from "../Pages/Wishlist";
import CheckoutPage from "../Pages/CheckoutPage";
import { FallbackRoute } from "./FallbackRoute";
//import { useAuth } from "../contexts/AuthContext"; // Assuming you have an auth context

// Lazy-loaded components
const Login = lazy(() => import("../components/Auth/Pages/Login"));
const Layout = lazy(() => import("../Layout"));
const Home = lazy(() => import("../Pages/Home"));
const AllBooks = lazy(() => import("../Pages/AllBooks"));
const SingleBooks = lazy(() => import("../Pages/SingleBooks"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Get authentication state
  return currentUser ? children : <Navigate to="/" replace />;
};

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading (resources, data, etc.)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Reduced to 2 seconds for better UX

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          style: {
            background: "linear-gradient(to right, #5C4C49, #D3BD9D)",
            color: "#fff",
            border: "2px solid #fff",
          },
        }}
      />

      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route
            path="/bookstore"
            element={
              //<ProtectedRoute>
              <Layout />
              //</ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="user">
              <Route path="profile" element={<UserProfile />} />
            </Route>
            <Route path="aboutUs" element={<AboutUs />} />
            <Route path="books" element={<AllBooks />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="book/:id" element={<SingleBooks />} />
          </Route>

          {/* Fallback route for 404 pages */}
          <Route path="*" element={<FallbackRoute />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
