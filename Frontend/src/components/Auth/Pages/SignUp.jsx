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
import { signup } from "../../../utils/apis/authApis";
import useAuth from "../../../Hooks/useAuth";
import { useDispatch } from "react-redux";
import {
  confirmPasswordValidation,
  emailValidationRules,
  firstNameValidationRules,
  lastNameValidationRules,
  passwordValidationRules,
} from "../../../utils/validations/rules";
import { VALIDATION_MESSAGES } from "../../../utils/validations/messages";
import useInputHandlers from "../../../Hooks/useInputHandlers";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    trigger,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
  });

  const { handleKeyDown, handleInput } = useInputHandlers(setError, clearErrors);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const dispatch = useDispatch();
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  useEffect(() => {
    if (confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password, confirmPassword, trigger]);

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
          "Something went wrong. Please try again later.",
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
            className="overflow-hidden bg-[#ffffff7f] backdrop-blur-sm shadow-xl p-3 rounded-3xl"
          >
            <div className="p-3">
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
                      {...register("firstName", firstNameValidationRules)}
                      maxLength={firstNameValidationRules.maxLength.value}
                      onKeyDown={(e) =>
                        handleKeyDown(
                          e,
                          /^[A-Za-z\s]$/,
                          "firstName",
                          "First Name",
                          VALIDATION_MESSAGES.OnlyLetters,
                          firstNameValidationRules.maxLength.value,
                        )
                      }
                      onInput={(e) =>
                        handleInput(
                          e,
                          /^[A-Za-z\s]$/,
                          firstNameValidationRules.maxLength.value,
                          "firstName",
                          "First Name",
                        )
                      }
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
                      {...register("lastName", lastNameValidationRules)}
                      maxLength={lastNameValidationRules.maxLength.value}
                      onKeyDown={(e) =>
                        handleKeyDown(
                          e,
                          /^[A-Za-z\s]$/,
                          "lastName",
                          "Last Name",
                          VALIDATION_MESSAGES.OnlyLetters,
                          lastNameValidationRules.maxLength.value,
                        )
                      }
                      onInput={(e) =>
                        handleInput(
                          e,
                          /^[A-Za-z\s]$/,
                          lastNameValidationRules.maxLength.value,
                          "lastName",
                          "Last Name",
                        )
                      }
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-4"
                >
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    icon={
                      <LockClosedIcon className="w-5 h-5 text-[#5e4c378f]" />
                    }
                    error={errors.password?.message}
                    {...register("password", passwordValidationRules)}
                    maxLength={passwordValidationRules.maxLength.value}
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        null,
                        "password",
                        "Password",
                        null,
                        passwordValidationRules.maxLength.value,
                      )
                    }
                    onInput={(e) =>
                      handleInput(
                        e,
                        null,
                        passwordValidationRules.maxLength.value,
                        "password",
                        "Password",
                      )
                    }
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
                    placeholder="Repeat password"
                    icon={
                      <LockClosedIcon className="w-5 h-5 text-[#5e4c378f]" />
                    }
                    error={errors.confirmPassword?.message}
                    {...register(
                      "confirmPassword",
                      confirmPasswordValidation(getValues),
                    )}
                    maxLength={
                      confirmPasswordValidation(getValues).maxLength.value
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(
                        e,
                        null,
                        "confirmPassword",
                        "Confirm Password",
                        null,
                        confirmPasswordValidation(getValues).maxLength.value,
                      )
                    }
                    onInput={(e) =>
                      handleInput(
                        e,
                        null,
                        confirmPasswordValidation(getValues).maxLength.value,
                        "confirmPassword",
                        "Confirm Password",
                      )
                    }
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
                      <span className="text-[#5e4c37c2]">
                        I agree to the{" "}
                        <a
                          href="#"
                          className="text-[#5e4c37] font-semibold hover:underline"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className="text-[#5e4c37] font-semibold hover:underline"
                        >
                          Privacy Policy
                        </a>
                      </span>
                    }
                    error={errors.termsAccepted?.message}
                    {...register("termsAccepted", {
                      required: VALIDATION_MESSAGES.termsAcceptedRequired,
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
                        (window.location.href = `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}/auth/google`)
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
                className="flex flex-col items-center gap-3 mt-6 text-center"
              >
                <p className="text-xs bg-[rgba(0,0,0,0.36)]  px-3 py-1 rounded-[12px] text-[#e1d5ca]">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="inline-block font-medium transition-transform text-[#e1d5ca] hover:text-[#e1d5ca]/70 hover:scale-105"
                  >
                    Sign in &rarr;
                  </Link>
                </p>
                <div className="text-xs bg-[rgba(0,0,0,0.36)] px-3 py-1 rounded-[12px] text-[#e1d5ca]">
                  <Link
                    to="/nextChapter"
                    className="inline-block font-medium transition-transform text-[#e1d5ca] hover:text-[#e1d5ca]/70 hover:scale-105"
                  >
                    Explore without account &rarr;
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="px-2 py-4 text-center bg-[rgba(252,237,219,0.37)] backdrop-blur-sm rounded-3xl"
            >
              <p className="text-[11px] text-[#5e4c37]">
                By creating an account, you agree to our{" "}
                <a
                  href="#"
                  className="font-medium transition-all text-[12px] duration-200 text-[#5e4c37] hover:text-[#5e4c37]/70 hover:scale-105"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium transition-all text-[12px] duration-200 text-[#5e4c37] hover:text-[#5e4c37]/70 hover:scale-105"
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
              <b>&copy; {new Date().getFullYear()} NextChapter.</b> All rights
              reserved.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
