const jwt = require("jsonwebtoken");
const template = require("./mailer/forgotPasswordTemplate");
const sendMail = require("./mailer");
const { generateAccessToken } = require("./jwtAuth");

// const generateForgotPasswordToken = (email) => {
//   return jwt.sign(
//     { email: email },
//     process.env.TOKEN_SECRET,
//     { expiresIn: 60 * 60 }
//   );
// };

async function sendForgotPasswordEmail(email) {
  const token = generateAccessToken(email);
  const link = `http://localhost:3000/forgotPassword/?email=${email}&authenticateForgotPassword=${token}`;

  const mailTemplate = `<a href=${link}>Create newwpassword</a>`;
  sendMail(
    email,
    "Link for create new password",
    mailTemplate
  );
  return token;
}

module.exports = { sendForgotPasswordEmail };
