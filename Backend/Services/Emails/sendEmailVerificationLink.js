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
  try {
    const APP_NAME = "NextChapter";

    const subject = `Welcome to ${APP_NAME} - Verify Your Email`;

    const text = getPlainTextTemplate({
      mainMessage: "Verify your email address using the link below.",
      buttonLink: emailVerificationLink,
      expiryMinutes: EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
    });

    const html = getEmailTemplate({
      title: `Welcome to ${APP_NAME}, ${name}`,
      mainMessage:
        "Thank you for signing up! To get started, please verify your email address by clicking the button below.",
      buttonText: "Verify Email Address",
      buttonLink: emailVerificationLink,
      secondaryMessage:
        "If you didn’t create an account, you can safely ignore this email.",
      expiryMinutes: EMAIL_VERIFICATION_TOKEN_EXPIRES_IN,
    });

    await sendEmail({ to: email, subject, html, text });
  } catch (error) {
    console.error("Failed to send email verification link:", error);
    throw error;
  }
};
