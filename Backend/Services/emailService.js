const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendPasswordResetEmail = async (email, resetLink) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your NextChapter Password",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset - NextChapter</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  margin: 0;
                  padding: 0;
                  background-color: #f5f5f5;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #7C664D;
                  padding: 30px 20px;
                  text-align: center;
              }
              .logo {
                  max-width: 180px;
                  height: auto;
              }
              .content {
                  padding: 40px 30px;
              }
              .title {
                  color: #7C664D;
                  font-size: 24px;
                  font-weight: bold;
                  margin-bottom: 20px;
                  text-align: center;
              }
              .message {
                  color: #555;
                  font-size: 16px;
                  margin-bottom: 25px;
                  text-align: center;
              }
              .button-container {
                  text-align: center;
                  margin: 30px 0;
              }
              .reset-button {
                  display: inline-block;
                  background-color: #B59980;
                  color: white !important;
                  text-decoration: none;
                  padding: 14px 32px;
                  border-radius: 4px;
                  font-weight: bold;
                  font-size: 16px;
                  transition: background-color 0.3s;
              }
              .reset-button:hover {
                  background-color: #7C664D;
              }
              .expiry-notice {
                  background-color: #E9E4E0;
                  padding: 15px;
                  border-radius: 4px;
                  text-align: center;
                  margin: 20px 0;
                  font-size: 14px;
                  color: #7C664D;
              }
              .footer {
                  background-color: #f9f9f9;
                  padding: 20px;
                  text-align: center;
                  font-size: 12px;
                  color: #777;
                  border-top: 1px solid #eee;
              }
              .support {
                  margin-top: 10px;
                  color: #7C664D;
              }
              @media only screen and (max-width: 600px) {
                  .content {
                      padding: 20px 15px;
                  }
                  .title {
                      font-size: 20px;
                  }
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <img
                  style="border-radius: 2rem;"
                  src="https://t3.ftcdn.net/jpg/15/64/10/34/360_F_1564103450_pfMdrCQleVesgyqnTCFKNzDmlUrXC2ER.jpg" alt="NextChapter" class="logo">
              </div>
              
              <div class="content">
                  <h1 class="title">Reset Your Password</h1>
                  
                  <p class="message">
                      We received a request to reset your password for your NextChapter account. 
                      Click the button below to create a new password.
                  </p>
                  
                  <div class="button-container">
                      <a href="${resetLink}" 
                      style="text-decoration: none, color: #fff;"
                      class="reset-button">Reset Password</a>
                  </div>
                  
                  <div class="expiry-notice">
                      <strong>Important:</strong> This link will expire in 10 minutes for security reasons.
                  </div>
                  
                  <p class="message">
                      If you didn't request a password reset, please ignore this email. 
                      Your account remains secure.
                  </p>
                  
                  <p class="message">
                      If the button above doesn't work, copy and paste this link into your browser:
                  </p>
                  
                  <p style="text-align: center; word-break: break-all; color: #7C664D; font-size: 14px;">
                      ${resetLink}
                  </p>
              </div>
              
              <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} NextChapter. All rights reserved.</p>
                  <p class="support">
                      Need help? Contact our support team at 
                      <a href="mailto:nextchapter744@gmail.com
" style="color: #7C664D;">nextchapter744@gmail.com
</a>
                  </p>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  return await transporter.sendMail(mailOptions);
};
