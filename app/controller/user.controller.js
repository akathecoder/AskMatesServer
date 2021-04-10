const User = require("../models/User.model.js");

// * Create and save a new Customer
exports.create = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
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
      res.send(data);
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
      res.send(data);
    }
  });
};

// * Find a Single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Error retrieving User with id " +
            req.params.userId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// * Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Update the User
  User.updateById(
    req.params.userId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.userId}.`,
          });
        } else {
          res.status(500).send({
            message:
              "Error updating User with id " +
              req.params.userId,
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

// * Delete a User with the specified userId in the request
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete User with id " +
            req.params.userId,
        });
      }
    } else
      res.send({
        message: `User was deleted successfully!`,
      });
  });
};
