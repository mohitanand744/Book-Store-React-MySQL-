import { VALIDATION_MESSAGES } from "./messages";
import { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX } from "./regex";

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
  pattern: {
    value: PASSWORD_REGEX,
    message: VALIDATION_MESSAGES.passwordInvalid,
  },
};

export const confirmPasswordValidationRules = {
  required: VALIDATION_MESSAGES.confirmPasswordRequired,
  validate: (value) =>
    value === watch("password") || VALIDATION_MESSAGES.passwordMismatch,
};
