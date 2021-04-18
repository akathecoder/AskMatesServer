const jwt = require("jsonwebtoken");
const template = require("./mailer/template");
const sendMail = require("./mailer");

async function sendRegisterEmail(
  firstName,
  username,
  email
) {
  const token = generateRegisterToken(username, email);
  const link =
    "http://localhost:4001/confirmEmail/" + token;

  const mailTemplate = template(firstName, username, link);

  sendMail(
    email,
    "Confirm your Registration on AskMates",
    mailTemplate
  );

  return token;
}

const generateRegisterToken = (username, email) => {
  return jwt.sign(
    { username: username, email: email },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 60 * 15,
    }
  );
};

module.exports = { sendRegisterEmail };
