import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Modal from "../../Modal/ModalContainer";
import Button from "../../Buttons/Button";
import { login } from "../../../utils/apis/authApi";
import Login from "./../Pages/Login";

const EmailVerificationStatus = ({
  status,
  setStatus,
  email,
  onClose,
  password,
  countdown,
  setCountdown,
}) => {
  const [showModal, setShowModal] = useState(true);
  const [emailResent, setEmailResent] = useState(false);
  const [isResending, setIsResending] = useState(false);

  console.log(email, "email");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      await login({ email, password });
    } catch (error) {
      setEmailResent(true);
      console.error("Failed to resend email:", error);
    } finally {
      setIsResending(false);
      setCountdown(30);
    }
  };

  useEffect(() => {
    setShowModal(status !== "");
  }, [status]);

  useEffect(() => {
    setTimeout(() => {
      setEmailResent(false);
    }, 3000);
  }, [emailResent]);

  const handleClose = () => {
    setShowModal(false);
    setEmailResent(false);
    setIsResending(false);
    setCountdown(0);
    setStatus("");
    onClose?.();
  };

  // Success Modal - Email Verified
  const renderSuccessModal = (email) => (
    <Modal isOpen={showModal} onClose={handleClose}>
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
          <h2 className="mb-3 text-2xl font-bold text-center text-[#5E4C37]">
            Email Verified Successfully!
          </h2>
          <p className="mb-4 text-sm text-center text-[#5E4C37]">
            Your email address <b>{email}</b> has been successfully verified.
            You can now access all features of your account.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleClose}
            variant="primary"
            className="w-full max-w-xs"
          >
            Continue to Login
          </Button>
        </div>
      </div>
    </Modal>
  );

  // Failure Modal - Email Verification Failed
  const renderFailureModal = (email) => (
    <Modal isOpen={showModal} onClose={handleClose}>
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
            className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full"
          >
            <motion.svg
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.5,
                ease: "easeInOut",
              }}
              className="w-10 h-10 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
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
          <h2 className="mb-3 text-2xl font-bold text-center text-[#5E4C37]">
            Verification Failed
          </h2>
          <p className="mb-4 text-sm text-center text-[#5E4C37]">
            The{" "}
            <b className="text-red-500">
              verification link is invalid or has expired
            </b>
            . Please request a new verification email <b>({email})</b>.
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
                  Verification email has been sent successfully! Please check
                  your inbox.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              : "Resend Verification"}
          </Button>

          <Button
            variant="outline"
            className="hover:bg-red-800 hover:text-white"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );

  // Unverified Modal - Check Your Inbox
  const renderUnverifiedModal = (email) => (
    <Modal isOpen={showModal} onClose={handleClose}>
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
          <h2 className="mb-3 text-2xl font-bold text-center text-[#5E4C37]">
            Complete Your Verification
          </h2>
          <p className="mb-4 text-sm text-center text-[#5E4C37]">
            We've sent a <b>verification link</b> to your email <b>{email}</b>.
            Please check your inbox and click the link to verify your email
            address.
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
                  Verification email has been resent successfully! Please check
                  your inbox.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-2 gap-4">
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
              : "Resend Verification"}
          </Button>
          <Button
            variant="outline"
            className="hover:bg-red-800 hover:text-white"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );

  // Render modal based on status
  const renderModal = (email) => {
    switch (status) {
      case "verified":
        return renderSuccessModal(email);
      case "failed":
        return renderFailureModal(email);
      case "unverified":
        return renderUnverifiedModal(email);
      default:
        return null;
    }
  };

  return renderModal(email);
};

export default EmailVerificationStatus;
