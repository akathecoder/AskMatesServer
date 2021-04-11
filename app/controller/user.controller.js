const User = require("../models/User.model.js");

// * Create and save a new Customer
exports.create = (req, res) => {
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
};

// * Find a Single User with a userId
exports.findOne = (req, res) => {
  User.findByUsername(req.params.username, (err, data) => {
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
  });
};

// * Update a User identified by the username in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Update the User
  User.updateById(
    req.params.username,
    new User(req.body),
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
};

// * Delete a User with the specified userId in the request
exports.delete = (req, res) => {
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
};

// * Login/Authentication by checking password and username
exports.authenticate = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
    return;
  }

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
        } else {
          res.status(500).send({
            message:
              "Error authenticating user " +
              req.params.username,
          });
        }
      } else {
        res.status(200).send(data);
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

    res.status(400).send({
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

    res.status(400).send({
      message: "email already exists",
    });
  });
};
