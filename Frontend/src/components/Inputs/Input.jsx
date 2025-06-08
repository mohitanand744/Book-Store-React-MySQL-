import React, { useState } from "react";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

const Input = React.forwardRef(
  (
    {
      label,
      type = "text",
      placeholder,
      error,
      className = "",
      containerClassName = "",
      icon,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // Determine input type based on toggle and original type
    const inputType =
      type === "password" ? (showPassword ? "text" : "password") : type;

    return (
      <div className={`mb-4 ${containerClassName}`}>
        {label && (
          <label className="block text-sm font-medium text-[#5e4c37] mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            placeholder={placeholder}
            className={`w-full px-4 py-2 rounded-lg border ${
              error
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-[#8a7053] focus:border-[#8a7053]"
            } shadow-sm focus:outline-none focus:ring-2 ${className}`}
            {...props}
          />

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
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ExclamationCircleIcon
                className="w-5 h-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-red-600" id="input-error">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
