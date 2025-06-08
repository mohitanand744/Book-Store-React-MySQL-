// src/pages/Login.jsx
import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Button from "./../../Buttons/Button";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Input from "./../../Inputs/Input";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    // Handle login logic here
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-3 p-4 bg-[url('https://wallpapercave.com/wp/wp4064613.jpg')] bg-center bg-no-repeat bg-cover">
      <div className="flex gap-4 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="overflow-hidden bg-[#a2a2a27f] shadow-xl rounded-2xl"
          >
            <div className="p-8">
              <div className="mb-8 text-center">
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-2 text-3xl font-bold text-gray-900"
                >
                  Welcome Back
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600"
                >
                  Sign in to your BookHaven account
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
                    icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
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
                    icon={<LockClosedIcon className="w-5 h-5 text-gray-400" />}
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
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="block ml-2 text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-sm"
                  >
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
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
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="#"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.477 0 10c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0110 4.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C17.14 18.163 20 14.418 20 10c0-5.523-4.477-10-10-10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <a
                      href="#"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm3 8v-2h-2v2h-2v2h2v2h2v-2h2v-2h-2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 text-center"
              >
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign up
                  </a>
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="px-8 py-6 text-center bg-gray-50 rounded-b-2xl"
            >
              <p className="text-xs text-gray-500">
                By signing in, you agree to our{" "}
                <a
                  href="#"
                  className="font-medium text-gray-600 hover:text-gray-500"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium text-gray-600 hover:text-gray-500"
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
            className="mt-8 text-center"
          >
            <p className="text-xs bg-[#a2a2a27f] text-gray-500">
              &copy; 2023 BookHaven. All rights reserved.
            </p>
          </motion.div>
        </motion.div>
        {/*  <div className="w-full max-w-md h-[628px] ">
          <img
            className="object-cover w-full h-full rounded-xl"
            src=""
            alt=""
          />
        </div> */}
      </div>
    </div>
  );
};

export default Login;
