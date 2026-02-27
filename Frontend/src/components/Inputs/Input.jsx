import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import CustomSelect from "./CustomSelect";
import { toast } from "sonner";

const Input = (
  {
    label,
    type = "text",
    placeholder,
    error,
    className = "",
    containerClassName = "",
    icon,
    value,
    onChange,
    setSelectedValue,
    selectedValue,
    preventCopyPaste = false,
    options,
    as: Component = "input", // Default to 'input' if not specified
    ...props
  },
  ref,
) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleBlock = (e) => {
    if (preventCopyPaste) {
      e.preventDefault();
      toast.error("You are not allowed to Copy & Paste here.");
    }
  };

  // Determine input type based on toggle and original type
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`mb-4 w-full ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-[#5e4c37] mb-1">
          {label}
        </label>
      )}
      <div className="relative w-full">
        {Component === "select" ? (
          <CustomSelect
            ref={ref}
            options={options}
            value={selectedValue}
            onChange={onChange}
            error={error}
            className={className}
            placeholder={placeholder}
          />
        ) : Component === "textarea" ? (
          <textarea
            ref={ref}
            className={`w-full px-4 py-2 rounded-lg border ${
              error
                ? "border-red-500 placeholder:text-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-[#8a7053] focus:border-[#8a7053]"
            } shadow-sm focus:outline-none focus:ring-2 ${className}`}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            type={inputType}
            className={`w-full px-4 py-2 rounded-lg border ${
              error
                ? "border-red-500 placeholder:text-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-[#8a7053] focus:border-[#8a7053]"
            } shadow-sm  focus:outline-none focus:ring-2 ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onCopy={handleBlock}
            onPaste={handleBlock}
            onCut={handleBlock}
            onDrag={handleBlock}
            onDrop={handleBlock}
            autoComplete="newPassword"
            {...props}
          />
        )}

        {/* Custom right icon: show/hide or external icon */}
        {!error && (
          <div className="absolute inset-y-0 flex items-center right-4">
            {type === "password" ? (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="focus:outline-none text-[#5e4c37a2]"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            ) : icon ? (
              <div className="pl-3 pointer-events-none">{icon}</div>
            ) : null}
          </div>
        )}
        {error && (
          <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3 pointer-events-none">
            {type === "password" ? (
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="focus:outline-none pointer-events-auto text-[#5e4c37a2]"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            ) : (
              Component !== "select" && (
                <ExclamationCircleIcon
                  className="w-5 h-5 text-red-500"
                  aria-hidden="true"
                />
              )
            )}
          </div>
        )}
      </div>
      {Component !== "select" && error && (
        <p className="mt-1 text-sm text-red-600" id="input-error">
          {error}
        </p>
      )}
    </div>
  );
};

Input.displayName = "Input";

export default React.forwardRef(Input);
