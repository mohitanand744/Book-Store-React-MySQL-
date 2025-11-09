const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendEmail = async ({ to, subject, html, text }) => {
  try {
    const info = await transporter.sendMail({
      from: `"NextChapter Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      text,
    });
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Failed to send email");
  }
};
