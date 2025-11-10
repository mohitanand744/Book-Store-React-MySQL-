// src/pages/Login.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Button from "./../../Buttons/Button";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Input from "./../../Inputs/Input";
import Checkbox from "../../Inputs/Checkbox";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../Modal/ForgotPassword";
import { login, verifyResetToken } from "../../../utils/apis/authApi";
import toast from "react-hot-toast";
import useAuth from "../../../Hooks/useAuth";
import ResetPasswordModal from "../Modal/resetPassword";
import EmailVerificationStatus from "../Modal/EmailVerificationStatus";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const { loginStatusSuccess, isAuthenticated } = useAuth();
  const [showForgot, setShowForgot] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [resetToken, setResetToken] = useState(() =>
    localStorage.getItem("resetToken")
  );
  const [verificationStatus, setVerificationStatus] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [linkSent, setLinkSent] = useState(false);
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const location = useLocation();

  console.log(resetToken, "ResetToken");

  const handleResetTokenVerification = async () => {
    try {
      const response = await verifyResetToken(resetToken);

      if (response?.success) {
        setShowResetModal(true);
        setLinkSent(false);
      }
    } catch (error) {
      setShowResetModal(false);
      toast.error(error.response?.data?.message || "Invalid Link");
      localStorage.removeItem("resetToken");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const status = queryParams.get("status");
    if (token) {
      localStorage.setItem("resetToken", token);
      setResetToken(token);
      navigate("/", { replace: true });
    } else if (status) {
      if (status === "verified") {
        setVerificationStatus("verified");
        navigate("/", { replace: true });
      } else if (status === "failed") {
        setVerificationStatus("failed");
        navigate("/", { replace: true });
      } else if (status === "alreadyVerified") {
        setVerificationStatus("alreadyVerified");
        navigate("/", { replace: true });
        toast.error("Email is already verified!");
      }
    }
  }, [location, navigate]);

  useEffect(() => {
    if (resetToken) {
      handleResetTokenVerification();
    }
  }, [resetToken]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
    console.log(isChecked);
  };

  useEffect(() => {
    const { email, password } =
      JSON.parse(localStorage.getItem("loginData")) || {};

    if (email && password) {
      setValue("email", email);
      setValue("password", password);
      setIsChecked(true);
    }
  }, [setValue]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/nextChapter", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await login({
        email: data.email,
        password: data.password,
      });

      if (response?.success) {
        const { token, user } = response.data;

        loginStatusSuccess(user, token);

        toast.success("Login successful!");

        if (isChecked) {
          localStorage.setItem(
            "loginData",
            JSON.stringify({
              email: data.email,
              password: data.password,
            })
          );
        } else {
          localStorage.removeItem("loginData");
        }

        navigate("/nextChapter");
        reset();
      } else {
        toast.error(response?.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);

      const errData = error?.response?.data?.error;

      if (errData?.emailVerified) {
        setVerificationStatus(errData.emailVerified);
        return;
      }

      if (
        error.response?.data?.error?.type === "credential" &&
        error.response?.data?.error?.field === "password"
      ) {
        setError(error.response?.data?.error?.field || "root", {
          type: error.response?.data?.error?.type || "credential",
          message:
            error.response?.data?.error?.message || "Something went wrong",
        });
      } else {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again later."
        );
      }
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
                        value: 8,
                        message: "Password must be at least 8 characters",
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
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-sm"
                  >
                    <p
                      onClick={() => setShowForgot(true)}
                      className="font-medium text-[#5e4c37] hover:text-[#5e4c37]/80 cursor-pointer"
                    >
                      Forgot password?
                    </p>
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
        email={emailValue}
        setShowResetModal={setShowResetModal}
        setCountdown={setCountdown}
        setLinkSent={setLinkSent}
      />

      <ResetPasswordModal
        showReset={showResetModal}
        setShowReset={setShowResetModal}
        resetToken={resetToken}
        email={emailValue}
        emailVerified={linkSent}
        countdown={countdown}
        setCountdown={setCountdown}
      />

      <EmailVerificationStatus
        status={verificationStatus}
        setStatus={setVerificationStatus}
        email={emailValue}
        password={passwordValue}
        onClose={setVerificationStatus}
      />
    </div>
  );
};

export default Login;
