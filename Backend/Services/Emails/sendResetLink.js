const { RESET_TOKEN_EXPIRES_IN } = require("../../Config/constants");
const {
  getEmailTemplate,
  getPlainTextTemplate,
} = require("../../Templates/emailTemplates");
const { sendEmail } = require("./emailService");

exports.sendPasswordResetEmail = async (email, resetLink) => {
  const subject = "Reset Your NextChapter Password";

  const text = getPlainTextTemplate({
    mainMessage: "Reset your NextChapter password using the link below.",
    buttonLink: resetLink,
    expiryMinutes: RESET_TOKEN_EXPIRES_IN,
  });

  const html = getEmailTemplate({
    title: "Reset Your Password",
    mainMessage:
      "We received a request to reset your password for your NextChapter account. Click the button below to create a new password.",
    buttonText: "Reset Password",
    buttonLink: resetLink,
    secondaryMessage:
      "If you didn't request a password reset, please ignore this email. Your account remains secure.",
    expiryMinutes: RESET_TOKEN_EXPIRES_IN,
  });

  await sendEmail({ to: email, subject, html, text });
};
