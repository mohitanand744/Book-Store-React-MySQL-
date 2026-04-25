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
import { login, verifyResetToken } from "../../../utils/apis/authApis";
import { toast } from "sonner";
import useAuth from "../../../Hooks/useAuth";
import ResetPasswordModal from "../Modal/resetPassword";
import EmailVerificationStatus from "../Modal/EmailVerificationStatus";
import { useDispatch } from "react-redux";
import {
  emailValidationRules,
  passwordValidationRules,
} from "../../../utils/validations/rules";
import useInputHandlers from "../../../Hooks/useInputHandlers";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const { handleKeyDown, handleInput } = useInputHandlers(
    setError,
    clearErrors,
  );
  const navigate = useNavigate();
  const { loginStatusSuccess, getUserUpdatedDetails, isAuthenticated } =
    useAuth();

  const [showForgot, setShowForgot] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [resetToken, setResetToken] = useState(
    () => localStorage.getItem("resetToken") || false,
  );
  const [verificationStatus, setVerificationStatus] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [linkSent, setLinkSent] = useState(false);
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const location = useLocation();
  const [verificationEmail, setVerificationEmail] = useState(null);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState(
    null || localStorage.getItem("forgotPasswordEmail"),
  );
  const [
    afterExitingUserResettingPasswordPopup,
    setAfterExitingUserResettingPasswordPopupPopup,
  ] = useState(false);
  const dispatch = useDispatch();

  console.log("isAuth", isAuthenticated);

  const handleResetTokenVerification = async () => {
    try {
      const response = await verifyResetToken(resetToken);

      if (response?.success) {
        setShowResetModal(true);
        setLinkSent(false);
        setForgotPasswordEmail(response?.data?.email);
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
    const verifiedEmail = queryParams.get("email");

    if (verifiedEmail) {
      setVerificationEmail(verifiedEmail);
    }

    if (token) {
      localStorage.setItem("resetToken", token);
      setResetToken(token);
      setAfterExitingUserResettingPasswordPopupPopup(
        isAuthenticated ? true : false,
      );

      return;
    }

    if (status) {
      if (status === "verified") {
        setVerificationStatus("verified");
        setVerificationEmail(verifiedEmail);
      } else if (status === "failed") {
        setVerificationStatus("failed");
      } else if (status === "alreadyVerified") {
        setVerificationStatus("alreadyVerified");
      }

      navigate("/", { replace: true });
      return;
    }
  }, [location, navigate, isAuthenticated]);

  useEffect(() => {
    if (resetToken) {
      handleResetTokenVerification();
      navigate("/", { replace: true });
    } else if (!resetToken && isAuthenticated) {
      navigate("/nextChapter", { replace: true });
    }
  }, [resetToken, navigate, isAuthenticated]);

  useEffect(() => {
    if (verificationStatus === "alreadyVerified") {
      toast.success("Email already verified!");
    }
  }, [verificationStatus]);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    const { email, password } =
      JSON.parse(localStorage.getItem("loginData")) || {};

    if (!verificationStatus && email && password) {
      setValue("email", email);
      setValue("password", password);
      setIsChecked(true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      setVerificationEmail(data.email);
      const response = await login({
        email: data.email,
        password: data.password,
      });

      if (response?.success) {
        const { user } = response.data;

        loginStatusSuccess(user);
        //await getUserUpdatedDetails();
        toast.success("Login successful!");

        if (isChecked) {
          localStorage.setItem(
            "loginData",
            JSON.stringify({
              email: data.email,
              password: data.password,
            }),
          );
        } else {
          localStorage.removeItem("loginData");
        }
        reset();
      } else {
        toast.error(response?.message || "Invalid credentials");
      }
    } catch (error) {
      setCountdown(30);
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
          "Something went wrong. Please try again later.",
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen gap-3 p-4 bg-[url('/images/authBG.webp')] bg-center bg-no-repeat bg-cover">
      <div className="flex gap-4">
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md"
        >
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden bg-coffee/65 backdrop-blur-xl shadow-2xl rounded-3xl p-3 border border-tan/20"
          >
            <div className="p-3">
              <div className="mb-8 text-cream text-center">
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="object-cover w-auto h-32 mx-auto rounded-2xl mb-4"
                  src="/images/logo-transperant-light.png"
                  alt="Logo"
                />
                <motion.h1
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-2 text-3xl font-bold text-tan"
                >
                  Welcome Back
                </motion.h1>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-semibold text-tan/90"
                >
                  Sign in to your <b>NextChapter</b> account
                </motion.p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Input
                    label="Email Address"
                    labelClassName="text-cream/90"
                    type="email"
                    placeholder="your@email.com"
                    icon={<EnvelopeIcon className="w-5 h-5 text-cream/60" />}

                    error={errors.email?.message}
                    {...register("email", emailValidationRules)}
                    maxLength={emailValidationRules.maxLength.value}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        /^[a-zA-Z0-9_.+\-@]$/,
                        "email",
                        "Email",
                        "Invalid character for email",
                        emailValidationRules.maxLength.value,
                      )
                    }
                    onInput={(e) =>
                      handleInput(
                        e,
                        /^[a-zA-Z0-9_.+\-@]$/,
                        emailValidationRules.maxLength.value,
                        "email",
                        "Email",
                      )
                    }
                  />
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Input
                    label="Password"
                    labelClassName="text-cream/90"
                    type="password"
                    placeholder="••••••••"
                    icon={
                      <LockClosedIcon className="w-5 h-5 text-cream/60" />
                    }

                    error={errors.password?.message}
                    {...register("password", passwordValidationRules)}
                  />
                </motion.div>

                <div className="flex items-center justify-between mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center"
                  >
                    <Checkbox
                      id="remember-me"
                      label="Remember me"
                      labelClassName="text-cream/80"
                      checked={isChecked}
                      onChange={(e) => handleCheckboxChange(e)}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-sm"
                  >
                    <p
                      onClick={() => setShowForgot(true)}
                      className="font-medium text-cream/80 hover:text-cream cursor-pointer transition-colors"
                    >
                      Forgot password?
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t "></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 py-1 bg-tan/10 backdrop-blur-md text-cream/60 rounded-full border border-tan/10 font-semibold">
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
                      onClick={() =>
                        (window.location.href = `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}/auth/google`)
                      }
                    >
                      <motion.img
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 }}
                        src="/images/google.png"
                        alt="Google"
                        className="w-6 h-6"
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
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.9 }}
                        src="/images/fb.jpg"
                        alt="Facebook"
                        className="w-6 h-6 rounded-full"
                      />{" "}
                      <span className="ms-1">Facebook</span>
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col items-center mt-6 text-center"
              >
                <p className="text-xs flex gap-1 items-center px-3 py-1 rounded-[12px] text-cream/80">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="flex items-center gap-1 text-nowrap font-medium transition-transform   "
                  >
                    Sign up <span className="text-xl">&rarr;</span>
                  </Link>
                </p>
                <div className="text-xs  px-3 rounded-[12px] ">
                  <Link
                    to="/nextChapter"
                    className="flex items-center gap-1 text-nowrap px-3 text-cream/80 py-1 rounded-xl font-medium transition-transform  "
                  >
                    Explore without login{" "}
                    <span className="text-xl">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 }}
              className="px-2 py-4 bg-cream/30 backdrop-blur-sm text-center rounded-xl"
            >
              <p className="text-[11px] ">
                By creating an account, you agree to our{" "}
                <a
                  href="#"
                  className="font-semibold transition-all text-[12px] duration-200   hover:scale-105"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-semibold transition-all text-[12px] duration-200   hover:scale-105"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-4 text-center"
          >
            <p className="text-xs bg-cream/20 px-3 py-1 rounded-full text-tan">
              <b>&copy; {new Date().getFullYear()} NextChapter.</b> All rights
              reserved.
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
        setResetToken={setResetToken}
        email={emailValue}
        emailVerified={linkSent}
        countdown={countdown}
        setLinkSent={setLinkSent}
        setCountdown={setCountdown}
        isAuthenticated={isAuthenticated}
        forgotPasswordEmail={forgotPasswordEmail}
        afterExitingUserResettingPasswordPopup={
          afterExitingUserResettingPasswordPopup
        }
        setAfterExitingUserResettingPasswordPopupPopup={
          setAfterExitingUserResettingPasswordPopupPopup
        }
      />

      <EmailVerificationStatus
        status={verificationStatus}
        setStatus={setVerificationStatus}
        email={verificationEmail}
        password={passwordValue}
        onClose={setVerificationStatus}
        countdown={countdown}
        setCountdown={setCountdown}
      />
    </div>
  );
};

export default Login;


