const User = require("../models/User.model.js");
const {
  generateAccessToken,
  checkAccessToken,
} = require("../utils/jwtAuth");

// Password Hashing
const bcrypt = require("bcrypt");
const saltRounds = 10;

// * Create and save a new Customer
exports.create = async (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    middleName: req.body.middleName || "",
    lastName: req.body.lastName,
    email: req.body.email,
    bio: req.body.bio || "",
    batch: req.body.batch,
    degree: req.body.degree,
    field: req.body.field,
    rollNo: req.body.rollNo,
    dob: req.body.dob,
    mobileNumber: req.body.mobileNumber,
  });

  await bcrypt
    .hash(user.password, saltRounds)
    .then((hash) => {
      user.password = hash;
      console.log(hash);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the User.",
      });
    });

  // Save User in the Database
  User.create(user, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the User.",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

// * Retrieve all Users from the database.
exports.findAll = (req, res) => {
  // console.log(req.cookies.auth);

  if (checkAccessToken(req.cookies.auth)) {
    User.getAll((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while retrieving users.",
        });
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// * Find a Single User with a userId
exports.findOne = (req, res) => {
  if (checkAccessToken(req.cookies.auth)) {
    User.findByUsername(
      req.params.username,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with username ${req.params.username}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Error retrieving User with username " +
                req.params.username,
            });
          }
        } else {
          res.status(200).send(data);
        }
      }
    );
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// * Update a User identified by the username in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (
    checkAccessToken(req.cookies.auth) ==
    req.params.username
  ) {
    // Create a User
    const user = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      bio: req.body.bio,
      batch: req.body.batch,
      degree: req.body.degree,
      field: req.body.field,
      rollNo: req.body.rollNo,
      dob: req.body.dob,
    };

    // Removes undefined keys
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key]
    );

    // Update the User
    User.updateById(
      req.params.username,
      user,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with username ${req.params.username}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Error updating User with username " +
                req.params.username,
            });
          }
        } else {
          res.status(200).send(data);
        }
      }
    );
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// * Update a User identified by the username in the request
exports.updateEmail = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  if (
    checkAccessToken(req.cookies.auth) ==
    req.params.username
  ) {
    // Create a User
    const userData = {
      email: req.body.email,
      newEmail: req.body.newEmail,
    };

    // Update the User
    User.updateEmailById(
      req.params.username,
      userData,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with username ${req.params.username}.`,
            });
          } else {
            res.status(500).send({
              message:
                "Error updating User Email with username " +
                req.params.username,
            });
          }
        } else {
          res.status(200).send(data);
        }
      }
    );
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// * Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  if (
    checkAccessToken(req.cookies.auth) ==
    req.params.username
  ) {
    User.remove(req.params.username, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with username ${req.params.username}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Could not delete User with username " +
              req.params.username,
          });
        }
      } else
        res.status(200).send({
          message: `User was deleted successfully!`,
        });
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// * Login/Authentication by checking password and username
exports.authenticate = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

  console.log(req.body);

  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "username and password required",
    });
    return;
  }

  User.checkPassword(
    req.body.username,
    req.body.password,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(400).send({
            message: `authentication unsuccessful`,
          });
        } else if (err.kind === "not_valid") {
          res.status(402).send({
            message: `email authentication required`,
          });
        } else {
          res.status(500).send({
            message:
              "Error authenticating user " +
              req.params.username,
          });
        }
      } else {
        const token = generateAccessToken(
          req.body.username
        );
        res
          .status(200)
          .cookie("auth", token, {
            httpOnly: true,
            sameSite: true,
          })
          .cookie("username", req.body.username, {
            httpOnly: true,
            sameSite: true,
          })
          .send({
            message: data.message,
            auth: token,
            username: req.body.username,
          });
      }
    }
  );
};

// * Checks is a username is unique or not
exports.username = (req, res) => {
  if (!req.query.username) {
    res.status(400).send({
      message: "username is required!",
    });
    return;
  }

  User.checkUsername(req.query.username, (err, data) => {
    if (err) {
      res.status(500).send({
        error: "Something went wrong",
      });
    }

    if (data == "user_not_found") {
      res.status(200).send({
        message: "username does not already exists",
      });
      return;
    }

    res.status(200).send({
      message: "username already exists",
    });
  });
};

// * Checks is a email is already registered or not
exports.email = (req, res) => {
  if (!req.query.email) {
    res.status(400).send({
      message: "email is required!",
    });
    return;
  }

  User.checkEmail(req.query.email, (err, data) => {
    if (err) {
      res.status(500).send({
        error: "Something went wrong",
      });
    }

    if (data == "email_not_found") {
      res.status(200).send({
        message: "email does not already exists",
      });
      return;
    }

    res.status(200).send({
      message: "email already exists",
    });
  });
};

// * Confirms a User Email
exports.confirmEmail = (req, res) => {
  const username = checkAccessToken(req.params.token);

  if (username) {
    User.markValid(username, (err, data) => {
      if (err) {
        res.status(500).send({
          error: "Something went wrong",
        });
      } else {
        res.status(200).send({
          message: "Validated",
        });
      }
    });
  } else {
    res.status(401).send({
      message: "Invalid Registration Token",
    });
  }
};

// * Updates the password for the user
exports.updatePassword = (req, res) => {
  if (
    req.cookies.username &&
    checkAccessToken(req.cookies.auth) ==
      req.cookies.username
  ) {
    User.changePassword(
      req.cookies.username,
      req.body.password,
      req.body.newPassword,
      (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              "Could not change password for user with username " +
              req.cookies.username,
          });
        } else
          res.status(200).send({
            message: `User password was changed successfully!`,
          });
      }
    );
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// * Updates the Mobile Number for the user
exports.updateMobileNumber = (req, res) => {
  if (
    req.cookies.username &&
    checkAccessToken(req.cookies.auth) ==
      req.cookies.username
  ) {
    User.changeMobileNumber(
      req.cookies.username,
      req.body.mobileNumber,
      (err, data) => {
        if (err) {
          res.status(500).send({
            message:
              "Could not change Mobile Number for user with username " +
              req.cookies.username,
          });
        } else
          res.status(200).send({
            message: `Mobile Number was changed successfully!`,
          });
      }
    );
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
