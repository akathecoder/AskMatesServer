const jwt = require("jsonwebtoken");
const template = require("./mailer/template");
const sendMail = require("./mailer");

async function sendRegisterEmail(
  firstName,
  username,
  email
) {
  const link =
    "http://localhost:4001/confirmEmail/" +
    generateRegisterToken(username, email);

  const mailTemplate = template(firstName, username, link);

  sendMail(
    email,
    "Confirm your Registration on AskMates",
    mailTemplate
  );
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

const checkRegisterToken = (token) => {
  if (token == null) {
    return false;
  }

  return jwt.verify(
    token,
    process.env.TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.error(err);
        return false;
      } else {
        // console.log(decoded);
        return decoded.username;
      }
    }
  );
};

module.exports = { sendRegisterEmail };
