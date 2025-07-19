import React, { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "../components/Loaders/Loading";
import BookstoreLoader from "../components/Loaders/bookstoreLoader";
import SignUp from "../components/Auth/Pages/SignUp";
import UserProfile from "../Pages/UserProfile";
import OrdersPage from "../Pages/OrderPage";

// Lazy-loaded components
const Login = lazy(() => import("../components/Auth/Pages/Login"));
const Layout = lazy(() => import("../Layout"));
const Home = lazy(() => import("../Pages/Home"));
const AllBooks = lazy(() => import("../Pages/AllBooks"));
const SingleBooks = lazy(() => import("../Pages/SingleBooks"));
const AboutUs = lazy(() => import("../Pages/AboutUs"));

const Router = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            )
          }
        />
        <Route
          path="/signup"
          element={
            isLoading ? (
              <Loading />
            ) : (
              <Suspense fallback={<Loading />}>
                <SignUp />
              </Suspense>
            )
          }
        />

        <Route
          path="/bookstore"
          element={
            <Suspense fallback={<BookstoreLoader />}>
              <Layout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<BookstoreLoader />}>
                <Home />
              </Suspense>
            }
          />

          <Route path="user">
            <Route
              path="profile"
              element={
                <Suspense fallback={<BookstoreLoader />}>
                  <UserProfile />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="aboutUs"
            element={
              <Suspense fallback={<BookstoreLoader />}>
                <AboutUs />
              </Suspense>
            }
          />
          <Route
            path="books"
            element={
              <Suspense fallback={<BookstoreLoader />}>
                <AllBooks />
              </Suspense>
            }
          />
          <Route
            path="orders"
            element={
              <Suspense fallback={<BookstoreLoader />}>
                <OrdersPage />
              </Suspense>
            }
          />
          <Route
            path="book/:id"
            element={
              <Suspense fallback={<BookstoreLoader />}>
                <SingleBooks />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
