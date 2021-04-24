const sql = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const {
  sendRegisterEmail,
} = require("../utils/jwtCheckEmail");

// Constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.firstName = user.firstName;
  this.middleName = user.middleName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.bio = user.bio;
  this.batch = user.batch;
  this.degree = user.degree;
  this.field = user.field;
  this.rollNo = user.rollNo;
  this.dob = user.dob;
  this.mobileNumber = user.mobileNumber;
};

// * Insert a new User into the user Table
User.create = (newUser, result) => {
  // const sqlQuery = `INSERT INTO user (username, password, firstName, middleName, lastName, email, bio, batch, degree, field, rollNo, dob, mobileNumber) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);`;
  // const newUserData = [];

  const sqlQuery2 = "INSERT INTO user SET ?";

  sql.query(sqlQuery2, newUser, (err, res) => {
    if (err) {
      // console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", {
      id: res.insertId,
      ...newUser,
    });

    const token = sendRegisterEmail(
      newUser.firstName,
      newUser.username,
      newUser.email
    );

    result(null, {
      message:
        "user created with username " + newUser.username,
    });
  });
};

// * Returns the data of User by userId by running SELECT
User.findByUsername = (username, result) => {
  console.log(username);

  sql.query(
    `SELECT username, firstName, middleName, lastName, email, bio, batch, degree, field, rollNo, dob, mobileNumber FROM user WHERE username = ?`,
    username,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found user with the username === username
      result({ kind: "not_found" }, null);
    }
  );
};

// * Returns the data of all users
User.getAll = (result) => {
  const sqlQuery =
    "SELECT username, firstName, middleName, lastName, email, bio, batch, degree, field, rollNo, dob FROM user";

  sql.query(sqlQuery, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    // console.log("users: ", res);
    result(null, res);
  });
};

// * Updates the user data by username
User.updateById = (username, user, result) => {
  console.log("usereee");
  console.log(user);

  sql.query(
    "UPDATE user SET ? WHERE username = ?",
    [user, username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", {
        username: username,
        ...user,
      });
      result(null, { username: username, ...user });
    }
  );
};

User.updateEmailById = (username, userData, result) => {
  sql.query(
    "UPDATE user SET email = ?, isValid = FALSE WHERE username = ?",
    [userData.newEmail, username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated Email: ", {
        username: username,
        ...userData,
      });

      sendRegisterEmail("", username, userData.email);

      result(null, { message: "Email Updated" });
    }
  );
};

// * Removes a User
User.remove = (username, result) => {
  sql.query(
    "DELETE FROM user WHERE username = ?",
    username,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted user with username: ", username);
      result(null, res);
    }
  );
};

// * Checks Password
User.checkPassword = (username, password, result) => {
  sql.query(
    "SELECT password, isValid from user WHERE username = ?",
    [username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("valid : " + res[0].isValid);
        if (res[0].isValid) {
          bcrypt
            .compare(password, res[0].password)
            .then((passResult) => {
              if (passResult) {
                console.log(
                  "password authenticated : ",
                  username
                );
                result(null, {
                  message: "authentication successful",
                });
                return;
              } else {
                result({ kind: "not_found" }, null);
                return;
              }
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          result({ kind: "not_valid" }, null);
        }
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
};

// * Checks if a username exists or not
User.checkUsername = (username, result) => {
  sql.query(
    "SELECT username FROM user WHERE username = ?",
    [username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        if (res[0].username == username) {
          result(null, "user_found");
          return;
        } else {
          result(null, "user_not_found");
          return;
        }
      }

      result(null, "user_not_found");
    }
  );
};

// * Checks if a email exists or not
User.checkEmail = (email, result) => {
  sql.query(
    "SELECT email FROM user WHERE email = ?",
    [email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        if (res[0].email == email) {
          result(null, "email_found");
          return;
        } else {
          result(null, "email_not_found");
          return;
        }
      }

      result(null, "email_not_found");
    }
  );
};

// * Makes a User Valid
User.markValid = (username, result) => {
  sql.query(
    "UPDATE user SET `isValid` = TRUE WHERE `username` = ?",
    [username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      result(null, "validated");
    }
  );
};

// * Updates Password
User.changePassword = (
  username,
  password,
  newPassword,
  result
) => {
  User.checkPassword(username, password, (err, res) => {
    if (err) {
      result({ kind: "not_valid" }, null);
    } else {
      bcrypt
        .hash(newPassword, saltRounds)
        .then((hash) => {
          newPassword = hash;

          sql.query(
            "UPDATE user SET password = ? WHERE username = ?",
            [newPassword, username],
            (err, res) => {
              if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }

              result(null, "password changed");
            }
          );
        })
        .catch((err) => {
          result(err, null);
        });
    }
  });
};

User.updateForgottenPassword = (
  newPassword,
  email,
  result
) => {
  const query = `UPDATE user SET password = ? WHERE email = ?`;
  bcrypt
    .hash(newPassword, saltRounds)
    .then((hash) => {
      sql.query(query, [hash, email], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, "password changed");
      });
    })
    .catch((err) => {
      result(err, null);
    });
};

module.exports = User;
