const Questions = require("../models/Question.model");

// * Create and save a new Question
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  // Create a new Question
  const newQuestion = new question({
    questionId: req.body.questionId,
    doc: req.body.doc,
    views: req.body.views,
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    slug: req.body.slug,
  });

  // Save Question in the Database
  Questions.create(newQuestion, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Question.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a new Question
  const question = new question({
    questionId: req.body.questionId,
    doc: req.body.doc,
    views: req.body.views,
    title: req.body.title,
    content: req.body.content,
    userId: req.body.userId,
    slug: req.body.slug,
  });

  // Update the Question
  Questions.updateById(req.body.questionId, question, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Error updating User with questionId " + req.params.questionId,
        });
      } else {
        res.status(500).send({
          message:
            "Error updating User with questionId " + req.params.questionId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// * Delete a Question with the specified userId in the request
exports.deleteById = (req, res) => {
  Questions.deleteById(req.body.questionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Not Found Question with questionId " + req.params.questionId,
        });
      } else {
        res.status(500).send({
          message:
            "Could not delete Question with questionId " +
            req.params.questionId,
        });
      }
    } else
      res.send({
        message: `Question was deleted successfully!`,
      });
  });
};

// * Retrieve all Questions from the database.
exports.getAll = (req, res) => {
  Questions.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Questions.",
      });
    } else {
      res.send(data);
    }
  });
};

// * Find a Single Question with a questionId
exports.getByID = (req, res) => {
  Questions.getByID(req.params.questionId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Not Found Question with questionId " + req.params.questionId,
        });
      } else {
        res.status(500).send({
          message:
            "Error while Find Question with questionId " +
            req.params.questionId,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// * Find all the Question with a userId
exports.getByUserID = (req, res) => {
  Questions.getByUserID(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: "Not Found Question with userId " + req.params.userId,
        });
      } else {
        res.status(500).send({
          message:
            "Error while Finding Question with userId " + req.params.userId,
        });
      }
    } else {
      res.send(data);
    }
  });
};
