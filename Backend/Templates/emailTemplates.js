const { images } = require("../Config/cloudinary");

exports.getEmailTemplate = (options) => {
  const {
    title,
    mainMessage,
    buttonText,
    buttonLink,
    secondaryMessage,
    expiryMinutes = process.env.RESET_TOKEN_EXPIRES_IN,
  } = options;

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} - NextChapter</title>
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
    background-image: linear-gradient(rgba(242, 232, 218, 0.05), rgba(55, 45, 44, 0.7)),
                      url('${images.nextChapterBg}');
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
      border-radius: 1rem;
      overflow: hidden;
      padding: 1rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(10px);
    "
  >
<div
  style="
    background-image: url(${images.logo});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding: 40px 20px;
    text-align: center;
    border-radius: 1rem;
    height: 110px;
  "
>
</div>


      <div style="padding: 40px 30px;">
        <h1
          style="color: #7C664D; font-size: 24px; font-weight: bold; margin-bottom: 20px; text-align: center;"
        >
          ${title}
        </h1>

        <p
          style="color: #555; font-size: 16px; margin-bottom: 25px; text-align: center;"
        >
          ${mainMessage}
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a
            href="${buttonLink}"
            style="display: inline-block; background-color: #9D8C7A; color: white !important;
                   text-decoration: none; padding: 14px 32px; border-radius: 4px;
                   font-weight: bold; font-size: 16px; transition: background-color 0.3s;"
          >
            ${buttonText}
          </a>
        </div>

        ${
          expiryMinutes
            ? `
        <div
          style="background-color: #E9E4E0; padding: 15px; border-radius: 4px;
                 text-align: center; margin: 20px 0; font-size: 14px; color: #7C664D;"
        >
          <strong>Important:</strong> This link will expire in ${expiryMinutes} minutes for
          security reasons.
        </div>
        `
            : ""
        }

        <p
          style="color: #555; font-size: 16px; margin-bottom: 25px; text-align: center;"
        >
          ${secondaryMessage}
        </p>

        ${
          buttonLink
            ? `
        <p
          style="color: #555; font-size: 16px; margin-bottom: 25px; text-align: center;"
        >
          If the button above doesn't work, copy and paste this link into your
          browser:
        </p>

        <p
          style="text-align: center; word-break: break-all; color: #7C664D; font-size: 14px; border: 3px solid #E9E4E0; padding: 10px; border-radius: 1rem;"
        >
          ${buttonLink}
        </p>
        `
            : ""
        }
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
};

exports.getPlainTextTemplate = (options) => {
  const {
    mainMessage,
    buttonLink,
    expiryMinutes = process.env.RESET_TOKEN_EXPIRES_IN,
  } = options;

  let text = `${mainMessage}`;

  if (buttonLink) {
    text += `\n\nUse this link: ${buttonLink}`;
  }

  if (expiryMinutes) {
    text += `\n\nThis link will expire in ${expiryMinutes} minutes.`;
  }

  return text;
};
