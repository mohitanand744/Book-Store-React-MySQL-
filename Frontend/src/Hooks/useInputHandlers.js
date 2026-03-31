import { useCallback } from "react";

const useInputHandlers = (setError, clearErrors) => {
  const handleKeyDown = useCallback(
    (e, regex, fieldName, fieldLabel, message, maxLength) => {
      const allowedKeys = [
        "Backspace",
        "Tab",
        "ArrowLeft",
        "ArrowRight",
        "Delete",
        "Enter",
        "Control",
        "Alt",
        "Shift",
        "Meta",
      ];

      if (allowedKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
        return;
      }

      if (e.key.length === 1) {
        if (regex && !regex.test(e.key)) {
          e.preventDefault();
          setError(fieldName, {
            type: "manual",
            message: message || "Invalid character",
          });
          return;
        }

        if (maxLength && e.target.value.length >= maxLength) {
          e.preventDefault();
          setError(fieldName, {
            type: "manual",
            message: `Maximum ${maxLength} characters allowed for ${fieldLabel}`,
          });
          return;
        }
      }

      clearErrors(fieldName);
    },
    [setError, clearErrors]
  );

  const handleInput = useCallback(
    (e, regex, maxLength, fieldName, fieldLabel) => {
      let value = e.target.value;
      let filteredValue = value;

      if (regex) {
        filteredValue = value
          .split("")
          .filter((char) => regex.test(char))
          .join("");
      }

      if (maxLength && filteredValue.length > maxLength) {
        filteredValue = filteredValue.slice(0, maxLength);
        setError(fieldName, {
          type: "manual",
          message: `Maximum ${maxLength} characters allowed for ${fieldLabel}`,
        });
      } else if (value !== filteredValue) {
        setError(fieldName, {
          type: "manual",
          message: "Invalid characters were filtered",
        });
      } else {
        clearErrors(fieldName);
      }

      if (value !== filteredValue) {
        e.target.value = filteredValue;
      }
    },
    [setError, clearErrors]
  );

  return { handleKeyDown, handleInput };
};

export default useInputHandlers;
