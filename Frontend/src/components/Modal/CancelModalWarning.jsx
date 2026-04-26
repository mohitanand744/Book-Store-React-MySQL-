import React from "react";
import { motion } from "framer-motion";
import Button from "../Buttons/Button";

const CancelModalWarning = ({ 
  confirmClose, 
  setWarningMsg, 
  title = "Leave Password Reset?", 
  message = "You're currently in the middle of resetting your password. If you exit now, you can always continue using the reset link sent to your email. Please note that the link will remain valid for 10 minutes.",
  stayText = "Stay Here",
  exitText = "Exit Reset"
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-md p-8 bg-coffee text-tan border-2 border-tan/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] relative overflow-hidden"
      >
        {/* Decorative corner element */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-tan/10 rounded-full blur-2xl"></div>

        <h2 className="mb-4 text-2xl font-bold text-tan flex items-center gap-2">
          <span className="w-2 h-8 bg-tan rounded-full"></span>
          {title}
        </h2>

        <p className="leading-relaxed text-tan/80 mb-8 italic">
          "{message}"
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-end gap-3">
          <Button
            variant="outline"
            className="w-full sm:w-auto px-6"
            onClick={() => setWarningMsg(false)}
          >
            {stayText}
          </Button>

          <Button
            variant="outline"
            className="w-full sm:w-auto px-6 !bg-red-error/15 hover:!bg-red-error/20"
            onClick={confirmClose}
          >
            {exitText}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CancelModalWarning;
