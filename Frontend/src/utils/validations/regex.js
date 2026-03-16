export const NAME_REGEX = /^[A-Za-z\s]{2,30}$/;

export const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export const INDIAN_PHONE_REGEX = /^[6-9]\d{9}$/;
