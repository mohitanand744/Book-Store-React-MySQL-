import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <center className="flex flex-col items-center justify-center h-screen gap-4">
      <h1>Working on Login page</h1>
      <Link to={"/bookstore"}>
        <button className="px-4 py-2 text-white bg-gray-600 rounded-2xl">
          Go to Website
        </button>
      </Link>
    </center>
  );
};

export default Login;
