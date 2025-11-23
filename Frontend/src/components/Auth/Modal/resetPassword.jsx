import { useForm } from "react-hook-form";
import Input from "../../Inputs/Input";
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import Modal from "../../Modal/ModalContainer";
import Button from "../../Buttons/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { forgotPassword, resetPassword } from "../../../utils/apis/authApi";
import toast from "react-hot-toast";

const ResetPasswordModal = ({
  showReset,
  setShowReset,
  emailVerified,
  email,
  resetToken,
  countdown,
  setCountdown,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm();

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailResent, setEmailResent] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [warningMsg, setWarningMsg] = useState(false);
  const newPassword = watch("newPassword");
  const emailValue = watch("email");

  const forgotPasswordEmail = localStorage.getItem("forgotPasswordEmail");

  useEffect(() => {
    if (forgotPasswordEmail) {
      setValue("email", forgotPasswordEmail);
    }
  }, [forgotPasswordEmail]);

  const onSubmit = async (data) => {
    try {
      const response = await resetPassword(
        emailValue,
        data.newPassword,
        data.confirmPassword,
        resetToken
      );

      if (response?.success) {
        setShowReset(false);
        toast.success(response?.message);

        localStorage.removeItem("resetToken");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );

      setShowReset(false);
      localStorage.removeItem("resetToken");
    }
  };

  const handleClose = () => {
    setWarningMsg(true);
  };

  const confirmClose = () => {
    reset();
    setShowReset(false);
    setEmailResent(false);
    setIsResending(false);
    localStorage.removeItem("resetToken");
    localStorage.removeItem("forgotPasswordEmail");
    setWarningMsg(false);
  };

  const handleResendEmail = async () => {
    setIsResending(true);

    try {
      const response = await forgotPassword(emailValue);

      if (response?.success) {
        setIsResending(false);
        setEmailResent(true);
      }
    } catch (error) {
      setIsResending(false);
      setEmailResent(false);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }

    setCountdown(30);
  };

  useEffect(() => {
    if (emailResent) {
      setTimeout(() => {
        setEmailResent(false);
      }, 5000);
    }
  }, [emailResent]);
  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  // Email Sent UI - Show when email is not verified yet
  if (emailVerified) {
    return (
      <Modal isOpen={showReset} onClose={handleClose}>
        <div className="w-full">
          <div className="mb-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full"
            >
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 0.3,
                  duration: 0.5,
                  ease: "easeInOut",
                }}
                className="w-10 h-10 text-green-600"
                viewBox="0 0 52 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  stroke="currentColor"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                />
              </motion.svg>
            </motion.div>
            <h2 className="mb-1 text-2xl font-bold text-center text-[#5E4C37]">
              Check Your Email
            </h2>
            <p className="mb-4 text-sm text-center text-[#5E4C37]">
              We've sent a password reset link to your email <b>{emailValue}</b>{" "}
              address. Please check your inbox and click the link to reset your
              password.
            </p>

            <AnimatePresence>
              {emailResent && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="p-3 mb-4 border border-green-200 rounded-lg bg-green-50"
                >
                  <p className="text-sm text-green-700">
                    Reset link has been resent successfully! Please check your
                    email.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative grid grid-cols-2 gap-4">
            <Button
              onClick={handleResendEmail}
              variant="primary"
              isLoading={isResending}
              className="w-full"
              disabled={isResending || countdown > 0}
            >
              {countdown > 0
                ? `Resend in ${countdown}s`
                : isResending
                ? "Sending..."
                : "Resend Reset Link"}
            </Button>
            {warningMsg && (
              <CancelModalWarning
                setWarningMsg={setWarningMsg}
                confirmClose={confirmClose}
              />
            )}
            <Button
              variant="outline"
              onClick={handleClose}
              className="w-full hover:bg-red-800 hover:text-white"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  // Reset Password Form - Show when email is verified and user clicked the link
  return (
    <Modal isOpen={showReset} onClose={handleClose}>
      <div className="w-full">
        <h2 className="mb-1 text-2xl font-bold text-center text-[#5E4C37]">
          Reset Password
        </h2>
        <p className="mb-4 text-sm text-center text-[#5E4C37]">
          Enter your new password and confirm it.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            icon={<LockClosedIcon className="w-5 h-5 text-[#5e4c379f]" />}
            endicon={
              showNewPassword ? (
                <EyeSlashIcon
                  className="w-5 h-5 text-[#5e4c379f] cursor-pointer"
                  onClick={() => setShowNewPassword(false)}
                />
              ) : (
                <EyeIcon
                  className="w-5 h-5 text-[#5e4c379f] cursor-pointer"
                  onClick={() => setShowNewPassword(true)}
                />
              )
            }
            error={errors.newPassword?.message}
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                message:
                  "Password must contain uppercase, lowercase, number and special character",
              },
            })}
            className="h-[50px]"
          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            icon={<LockClosedIcon className="w-5 h-5 text-[#5e4c379f]" />}
            endicon={
              showConfirmPassword ? (
                <EyeSlashIcon
                  className="w-5 h-5 text-[#5e4c379f] cursor-pointer"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <EyeIcon
                  className="w-5 h-5 text-[#5e4c379f] cursor-pointer"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )
            }
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === newPassword || "Passwords do not match",
            })}
            className="h-[50px]"
            preventCopyPaste={true}
          />

          <div className="relative grid grid-cols-2 gap-4">
            <Button type="submit" variant="primary" isLoading={isSubmitting}>
              Reset Password
            </Button>

            {warningMsg && (
              <CancelModalWarning
                setWarningMsg={setWarningMsg}
                confirmClose={confirmClose}
              />
            )}
            <Button
              variant="outline"
              className="hover:bg-red-800 hover:text-white"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ResetPasswordModal;

const CancelModalWarning = ({ confirmClose, setWarningMsg }) => {
  return (
    <div className="absolute top-[-10rem] left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="p-4 bg-white rounded-lg shadow-lg">
        <h2 className="mb-2 text-xl text-[#5E4C37] font-bold">
          Password Reset
        </h2>
        <p className="text-gray-600">
          <b className="text-yellow-500">Warning</b>: If you cancel the reset
          process, you'll need to use the reset link sent to your email.
          Remember, the reset link is valid for only 10 minutes. Are you sure
          you want to cancel?
        </p>
        <div className="flex items-center gap-4 mt-4">
          <Button variant="primary" className="" onClick={confirmClose}>
            Confirm
          </Button>
          <Button
            variant="outline"
            className="hover:bg-red-800 hover:text-white"
            onClick={() => setWarningMsg(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};
