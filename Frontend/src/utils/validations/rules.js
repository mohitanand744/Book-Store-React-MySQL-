import { VALIDATION_MESSAGES } from "./messages";
import { EMAIL_REGEX, INDIAN_PHONE_REGEX, NAME_REGEX, PASSWORD_REGEX } from "./regex";

export const firstNameValidationRules = {
  required: VALIDATION_MESSAGES.firstNameRequired,
  minLength: {
    value: 2,
    message: VALIDATION_MESSAGES.moreThan2Characters,
  },
  maxLength: {
    value: 30,
    message: VALIDATION_MESSAGES.lessThan30Characters,
  },
  pattern: {
    value: NAME_REGEX,
    message: VALIDATION_MESSAGES.OnlyLetters,
  },
};

export const lastNameValidationRules = {
  required: VALIDATION_MESSAGES.lastNameRequired,
  minLength: {
    value: 2,
    message: VALIDATION_MESSAGES.moreThan2Characters,
  },
  maxLength: {
    value: 30,
    message: VALIDATION_MESSAGES.lessThan30Characters,
  },
  pattern: {
    value: NAME_REGEX,
    message: VALIDATION_MESSAGES.OnlyLetters,
  },
};

export const emailValidationRules = {
  required: VALIDATION_MESSAGES.emailRequired,
  maxLength: {
    value: 254,
    message: "Email must be less than 254 characters",
  },
  pattern: {
    value: EMAIL_REGEX,
    message: VALIDATION_MESSAGES.invalidEmail,
  },
};

export const passwordValidationRules = {
  required: VALIDATION_MESSAGES.passwordRequired,
  minLength: {
    value: 8,
    message: VALIDATION_MESSAGES.passwordMinLength,
  },
  maxLength: {
    value: 64,
    message: "Password must be less than 64 characters",
  },
  pattern: {
    value: PASSWORD_REGEX,
    message: VALIDATION_MESSAGES.passwordInvalid,
  },
};

export const confirmPasswordValidation = (getValues) => ({
  required: VALIDATION_MESSAGES.confirmPasswordRequired,
  maxLength: {
    value: 64,
    message: "Confirm password must be less than 64 characters",
  },
  validate: (value) =>
    value === getValues("password") || VALIDATION_MESSAGES.passwordMismatch,
});

export const phoneValidationRules = {
  required: VALIDATION_MESSAGES.phoneRequired,
  pattern: {
    value: INDIAN_PHONE_REGEX,
    message: VALIDATION_MESSAGES.invalidPhone,
  },
};
