const Questions = require("../models/Question.model.js");

// -------------------------------------------------------------------
// * Create and save a new Question
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty!",
    });
  }

  // Create a new Question
  const newQuestion = new Questions({
    questionId: null,
    doc: req.body.doc,
    views: req.body.views,
    title: req.body.title,
    content: req.body.content,
    username: req.body.username,
    slug: req.body.slug,
  });

  // Save Question in the Database
  Questions.create(newQuestion, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Question.",
      });
    } else {
      console.log(
        req.body.questionId,
        "000000000000000000000000"
      );
      res.status(200).send(data);
    }
  });
};

// -------------------------------------------------------------------
// Update Question with questionId
exports.updateById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a new Question
  const question = { ...req.body };

  // Update the Question
  const quesId = req.params.questionId;
  Questions.updateById(quesId, question, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Not Found question with questionId " +
            req.params.questionId,
        });
      } else {
        res.status(500).send({
          message:
            "Error updating question with questionId " +
            req.params.questionId,
        });
      }
    } else {
      res.status(200).send(data);
    }
  });
};

// -------------------------------------------------------------------
// * Delete a Question with the specified questionId in the request
exports.deleteById = (req, res) => {
  Questions.deleteById(
    req.params.questionId,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message:
              "Not Found Question with questionId " +
              req.params.questionId,
          });
        } else {
          res.status(500).send({
            message:
              "Could not delete Question with questionId " +
              req.params.questionId,
          });
        }
      } else
        res.status(200).send({
          message: `Question was deleted successfully!`,
        });
    }
  );
};

// -------------------------------------------------------------------
// * Retrieve all Questions from the database.
exports.getAll = (req, res) => {
  Questions.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving Questions.",
      });
    } else {
      res.status(200).send(data);
    }
  });
};

// -------------------------------------------------------------------
// * Find a Single Question with a questionId
exports.getById = (req, res) => {
  if (req.query.questionId) {
    Questions.getById(req.query.questionId, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message:
              "Not Found Question with questionId " +
              req.query.questionId,
          });
        } else {
          res.status(500).send({
            message:
              "Error while Find Question with questionId " +
              req.query.questionId,
          });
        }
      } else {
        res.status(200).send(data);
      }
    });
  } else {
    Questions.getBySlug(req.query.slug, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message:
              "Not Found Question with slug " +
              req.query.slug,
          });
        } else {
          res.status(500).send({
            message:
              "Error while Find Question with slug " +
              req.query.slug,
          });
        }
      } else {
        res.status(200).send(data);
      }
    });
  }
};

// -------------------------------------------------------------------
// * Find all the Question with a username
exports.getByUsername = (req, res) => {
  Questions.getByUsername(
    req.params.username,
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message:
              "Not Found Question with username " +
              req.params.username,
          });
        } else {
          res.status(500).send({
            message:
              "Error while Finding Question with username " +
              req.params.username,
          });
        }
      } else {
        res.status(200).send(data);
      }
    }
  );
};

// -------------------------------------------------------------------
// Get Question by filtering the search in title and content of question.
exports.getBySearch = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Questions.getBySearch(req.params.search, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Not Found Question with text " +
            req.params.search,
        });
      } else {
        res.status(500).send({
          message:
            "Error while Find Question with text " +
            req.params.search,
        });
      }
    } else {
      res.status(200).send(data);
    }
  });
};
