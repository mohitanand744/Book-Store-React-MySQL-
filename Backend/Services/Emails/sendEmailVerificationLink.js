const {
  EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
} = require("../../Config/constants");
const {
  getEmailTemplate,
  getPlainTextTemplate,
} = require("../../Templates/emailTemplates");
const { sendEmail } = require("./emailService");

exports.sendEmailVerificationLink = async (
  email,
  emailVerificationLink,
  name
) => {
  const subject = "Welcome to Our Website - Verify Your Email";

  const text = getPlainTextTemplate({
    mainMessage: "Reset your NextChapter password using the link below.",
    buttonLink: emailVerificationLink,
    expiryMinutes: EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
  });

  const html = getEmailTemplate({
    title: `Welcome to Our Website - ${name}`,
    mainMessage:
      "Thank you for signing up. We're excited to have you on board.To get started, please verify your email address by clicking the link below:",
    buttonText: "Verify Email Address",
    buttonLink: emailVerificationLink,
    secondaryMessage:
      "If you didn't create an account, please ignore this email.",
    expiryMinutes: EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
  });

  await sendEmail({ to: email, subject, html, text });
};
