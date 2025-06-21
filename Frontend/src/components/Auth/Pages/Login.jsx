// src/pages/Login.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Button from "./../../Buttons/Button";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Input from "./../../Inputs/Input";
import Checkbox from "../../Inputs/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../Modal/ForgotPassword";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const [showForgot, setShowForgot] = useState(false);

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    console.log(data);
    // Handle login logic here

    navigate("/bookstore");
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-3 p-4 bg-[url('/images/authBG.webp')] bg-center bg-no-repeat bg-cover">
      <div className="flex gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-[#ffffff7f] backdrop-blur-sm shadow-xl rounded-2xl"
          >
            <div className="p-8">
              <div className="mb-8 text-center">
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="object-cover w-auto h-20 mx-auto mb-4"
                  src="/images/logo.png"
                  alt="Logo"
                />
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-2 text-3xl font-bold text-[#5E4C37]"
                >
                  Welcome Back
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-semibold text-[#5e4c37]"
                >
                  Sign in to your <b>NextChapter</b> account
                </motion.p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    icon={<EnvelopeIcon className="w-5 h-5 text-[#5e4c379f]" />}
                    error={errors.email?.message}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={
                      <LockClosedIcon className="w-5 h-5 text-[#5e4c378f]" />
                    }
                    error={errors.password?.message}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                </motion.div>

                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center"
                  >
                    <Checkbox
                      id="remember-me"
                      label="Remember me"
                      //checked={isChecked}
                      //onChange={(e) => setIsChecked(e.target.checked)}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-sm"
                  >
                    <a
                      href="#"
                      onClick={() => setShowForgot(true)}
                      className="font-medium text-[#5e4c37] hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    isLoading={isSubmitting}
                  >
                    Sign in
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 py-1 bg-white rounded-full text-slate-600">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="flex items-center justify-center w-full"
                    >
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        src="/images/google.png"
                        alt="Google"
                        className="w-5 h-5"
                      />{" "}
                      <span className="ms-1">Google</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="flex items-center justify-center w-full"
                    >
                      <motion.img
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        src="/images/fb.jpg"
                        alt="Facebook"
                        className="w-5 h-5 rounded-full"
                      />{" "}
                      <span className="ms-1">Facebook</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-[#5e4c37]">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-[#5e4c37] hover:text-indigo-500"
                  >
                    Sign up
                  </Link>
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="px-8 py-6 text-center bg-[rgba(252,237,219,0.37)] backdrop-blur-sm  rounded-b-2xl"
            >
              <p className="text-xs text-gray-700">
                By signing in, you agree to our{" "}
                <a
                  href="#"
                  className="font-medium transition-all duration-200 text-slate-700 hover:text-gray-600 hover:scale-105"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium transition-all duration-200 text-slate-700 hover:text-gray-600 hover:scale-105"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-center"
          >
            <p className="text-xs bg-[#a2a2a27f] px-3 py-1 rounded-full text-gray-50">
              &copy; 2023 NextChapter. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Modals */}
      <ForgotPasswordModal
        showForgot={showForgot}
        setShowForgot={setShowForgot}
      />
    </div>
  );
};

export default Login;
