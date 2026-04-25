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

  const { handleKeyDown, handleInput } = useInputHandlers(
    setError,
    clearErrors,
  );
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
    <div className="flex items-center justify-center min-h-screen gap-3 p-4 bg-[url('/images/authBG.png')] bg-center bg-no-repeat bg-cover">
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
            className="overflow-hidden bg-coffee/70 backdrop-blur-xl shadow-2xl p-3 rounded-3xl border border-tan/20"
          >
            <div className="p-3">
              <div className="mb-8 border bg-black/20 p-3 pt-1 rounded-2xl border-tan/20 text-cream text-center">
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="object-cover w-auto h-32 mx-auto mb-4 rounded-2xl"
                  src="/images/logo-transperant-light.png"
                  alt="Logo"
                />
                <motion.h1
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-2 text-3xl font-bold text-tan"
                >
                  Create Account
                </motion.h1>
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="font-semibold text-tan/90"
                >
                  Join <b>NextChapter</b> today
                </motion.p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Input
                      label="First Name"
                      labelClassName="text-cream/90"
                      type="text"
                      placeholder="First Name"
                      icon={<UserIcon className="w-5 h-5 text-cream/60" />}

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
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.45 }}
                  >
                    <Input
                      label="Last Name"
                      labelClassName="text-cream/90"
                      type="text"
                      placeholder="Last Name"
                      icon={<UserIcon className="w-5 h-5 text-cream/60" />}

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
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4"
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
                  transition={{ delay: 0.6 }}
                  className="mb-4"
                >
                  <Input
                    label="Password"
                    labelClassName="text-cream/90"
                    type="password"
                    placeholder="Enter password"
                    icon={
                      <LockClosedIcon className="w-5 h-5 text-cream/60" />
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
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.65 }}
                  className="mb-6"
                >
                  <Input
                    label="Confirm Password"
                    labelClassName="text-cream/90"
                    type="password"
                    placeholder="Repeat password"
                    icon={
                      <LockClosedIcon className="w-5 h-5 text-cream/60" />
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
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center mb-6"
                >
                  <Checkbox
                    id="termsAccepted"
                    labelClassName="text-cream/80"
                    label={
                      <span className="">
                        I agree to the{" "}
                        <a
                          href="#"
                          className=" font-semibold hover:underline text-cream"
                        >
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          className=" font-semibold hover:underline text-cream"
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
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
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
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9 }}
                className="mt-6"
              >
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-tan/30 "></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 py-1 bg-coffee/50 backdrop-blur-md text-cream/60 rounded-full border border-tan/10 font-semibold">
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
                className="flex flex-col items-center gap-3 mt-6 text-center"
              >
                <p className="text-xs flex gap-1 items-center px-3 rounded-[12px] text-cream/80">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="flex gap-1 items-center font-medium transition-transform text-cream "
                  >
                    Sign in <span className="text-xl">&rarr;</span>
                  </Link>
                </p>
                <div className="text-xs px-3 rounded-[12px] text-cream/80">
                  <Link
                    to="/nextChapter"
                    className="flex gap-1 items-center font-medium transition-transform text-cream "
                  >
                    Explore without account{" "}
                    <span className="text-xl">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.1 }}
              className="px-2 py-4 bg-black/20 backdrop-blur-sm text-center text-tan rounded-xl"
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
            <p className="text-xs text-tan bg-cream/20  px-3 py-1 rounded-full ">
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


