// src/pages/SignUp.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Button from "./../../Buttons/Button";
import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Input from "./../../Inputs/Input";
import Checkbox from "../../Inputs/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { signup } from "../../../utils/apis/authApi";
import { validateToken } from "../../../store/Redux/Slices/authSlice";
import useAuth from "../../../Hooks/useAuth";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/nextChapter", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    const payload = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      terms_accepted: data.termsAccepted,
    };

    try {
      const response = await signup(payload);

      if (response?.success) {
        toast.success(response?.message || "Signup successful!");
        navigate("/");
        reset();
      } else {
        toast.error(response?.message || "Signup failed. Please try again.");
        reset();
        navigate("/");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again later."
      );
      reset();
      navigate("/");
    }
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
                  Create Account
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-semibold text-[#5e4c37]"
                >
                  Join <b>NextChapter</b> today
                </motion.p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Input
                      label="First Name"
                      type="text"
                      placeholder="First Name"
                      icon={<UserIcon className="w-5 h-5 text-[#5e4c379f]" />}
                      error={errors.firstName?.message}
                      {...register("firstName", {
                        required: "First name is required",
                        minLength: {
                          value: 2,
                          message: "Must be at least 2 characters",
                        },
                      })}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Input
                      label="Last Name"
                      type="text"
                      placeholder="Last Name"
                      icon={<UserIcon className="w-5 h-5 text-[#5e4c379f]" />}
                      error={errors.lastName?.message}
                      {...register("lastName", {
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Must be at least 2 characters",
                        },
                      })}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4"
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
                  transition={{ delay: 0.6 }}
                  className="mb-4"
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
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Must include uppercase, lowercase, number, and special character",
                      },
                    })}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.65 }}
                  className="mb-6"
                >
                  <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    icon={
                      <LockClosedIcon className="w-5 h-5 text-[#5e4c378f]" />
                    }
                    error={errors.confirmPassword?.message}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    preventCopyPaste={true}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center mb-6"
                >
                  <Checkbox
                    id="termsAccepted"
                    label={
                      <span>
                        I agree to the{" "}
                        <a href="#" className="text-[#5e4c37] hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#5e4c37] hover:underline">
                          Privacy Policy
                        </a>
                      </span>
                    }
                    error={errors.termsAccepted?.message}
                    {...register("termsAccepted", {
                      required: "Please accept the terms and conditions",
                      validate: (value) => value === true || "Please accept",
                    })}
                  />
                </motion.div>

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
                    disabled={isSubmitting}
                  >
                    Create Account
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
                      Or sign up with
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
                      onClick={() =>
                      (window.location.href =
                        "http://localhost:3002/api/v1/auth/google")
                      }
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
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="font-medium text-[#5e4c37] hover:text-indigo-500"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="px-8 py-6 text-center bg-[rgba(252,237,219,0.37)] backdrop-blur-sm rounded-b-2xl"
            >
              <p className="text-xs text-gray-700">
                By creating an account, you agree to our{" "}
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
    </div>
  );
};

export default SignUp;
