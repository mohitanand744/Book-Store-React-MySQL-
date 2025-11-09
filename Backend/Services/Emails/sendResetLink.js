const { sendEmail } = require("./emailService");

exports.sendPasswordResetEmail = async (email, resetLink) => {
  const subject = "Reset Your NextChapter Password";

  const text = `Reset your NextChapter password using this link: ${resetLink}.
This link will expire in 10 minutes.`;

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Password Reset - NextChapter</title>
  </head>
  <body
   style="
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    margin: 0;
    padding: 1rem;
    background-color: #f2e8da;
    border-radius: 8px;
    overflow: hidden;
    background-image: linear-gradient(rgba(242, 232, 218, 0.85), rgba(242, 232, 218, 0.85)),
                      url('https://images.unsplash.com/photo-1512820790803-83ca734da794');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  "
  >
   <div
    style="
      max-width: 600px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(10px);
    "
  >
      <div
        style="background-color: #7C664D; padding: 30px 20px; text-align: center;"
      >
        <img
          src="https://t3.ftcdn.net/jpg/15/64/10/34/360_F_1564103450_pfMdrCQleVesgyqnTCFKNzDmlUrXC2ER.jpg"
          alt="NextChapter"
          style="max-width: 180px; height: auto; border-radius: 2rem;"
        />
      </div>

      <div style="padding: 40px 30px;">
        <h1
          style="color: #7C664D; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;"
        >
          Reset Your Password
        </h1>

        <p
          style="color: #555; font-size: 16px; margin-bottom: 25px; text-align: center;"
        >
          We received a request to reset your password for your NextChapter
          account. Click the button below to create a new password.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a
            href="${resetLink}"
            style="display: inline-block; background-color: #B59980; color: white !important;
                   text-decoration: none; padding: 14px 32px; border-radius: 4px;
                   font-weight: bold; font-size: 16px; transition: background-color 0.3s;"
          >
            Reset Password
          </a>
        </div>

        <div
          style="background-color: #E9E4E0; padding: 15px; border-radius: 4px;
                 text-align: center; margin: 20px 0; font-size: 14px; color: #7C664D;"
        >
          <strong>Important:</strong> This link will expire in 10 minutes for
          security reasons.
        </div>

        <p
          style="color: #555; font-size: 16px; margin-bottom: 25px; text-align: center;"
        >
          If you didn't request a password reset, please ignore this email. Your
          account remains secure.
        </p>

        <p
          style="color: #555; font-size: 16px; margin-bottom: 25px; text-align: center;"
        >
          If the button above doesn't work, copy and paste this link into your
          browser:
        </p>

        <p
          style="text-align: center; word-break: break-all; color: #7C664D; font-size: 14px;"
        >
          ${resetLink}
        </p>
      </div>

      <div
        style="background-color: #f9f9f9; padding: 20px; text-align: center;
               font-size: 12px; color: #777; border-top: 1px solid #eee;"
      >
        <p>&copy; ${new Date().getFullYear()} NextChapter. All rights reserved.</p>
        <p style="margin-top: 10px; color: #7C664D;">
          Need help? Contact our support team at
          <a href="mailto:nextchapter744@gmail.com"
             style="color: #7C664D; text-decoration: none;">
             nextchapter744@gmail.com
          </a>
        </p>
      </div>
    </div>
  </body>
  </html>
  `;

  await sendEmail({ to: email, subject, html, text });
};
