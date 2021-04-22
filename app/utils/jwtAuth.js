const jwt = require("jsonwebtoken");

const generateAccessToken = (username) => {
  return jwt.sign(
    { username: username },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 60 * 60 * 24 * 3,
    }
  );
};

const checkAccessToken = (token) => {
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

module.exports = { generateAccessToken, checkAccessToken };
