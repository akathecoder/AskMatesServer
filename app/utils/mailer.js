require("dotenv").config();

const nodemailer = require("nodemailer");
const template = require("./mailer/template");

var transporter = nodemailer.createTransport({
  pool: true,
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

async function sendMail(to, name, username, link) {
  var mailOptions = {
    from: "sparsh4drive002@gmail.com",
    to: to,
    subject: "Test Activation Email",
    html: template(
      name,
      username,
      link //activation link
    ),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

sendMail(
  "sparshagarwal@jklu.edu.in",
  "Sparsh",
  "akathecoder",
  "https://www.hostinger.in/tutorials/how-to-use-free-google-smtp-server"
);
