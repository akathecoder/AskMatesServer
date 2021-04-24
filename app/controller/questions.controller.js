const Questions = require("../models/Question.model.js");
const { checkAccessToken } = require("../utils/jwtAuth");
const slugify = require("slugify");

// -------------------------------------------------------------------
// * Create and save a new Question
// --------------------------------
exports.create = (req, res) => {
  const username = checkAccessToken(req.cookies.auth);
  if (username) {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty!",
      });
    }

    // Create a new Question
    const newQuestion = new Questions({
      questionId: null,
      doc: new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      views: 0,
      title: req.body.title,
      content: req.body.content,
      username: username,
      slug: slugify(req.body.title),
      tags: req.body.tags
        ? req.body.tags.toLowerCase()
        : "",
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
        console.log(req.body.questionId);
        res.status(200).send(data);
      }
    });
  } else {
    res.status(307).redirect(process.env.CLIENT_URL + "q/");
  }
};

// -------------------------------------------------------------------
// Update Question with questionId
// --------------------------------
exports.updateById = (req, res) => {
  const username = checkAccessToken(req.cookies.auth);

  if (username) {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    // Create a new Question
    const question = new Questions({
      doc: new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " "),
      title: req.body.title,
      content: req.body.content,
      slug: slugify(req.body.title),
      username: req.body.username,
      tags: req.body.tags
        ? req.body.tags.toLowerCase()
        : null,
    });

    // To check if the user who posted this question is only updating..
    if (question.username === username) {
      const quesId = req.params.questionId;
      // Update the Question
      Questions.updateById(
        quesId,
        question,
        (err, data) => {
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
        }
      );
    } else {
      res.status(405).send({
        message:
          "You are not authorized to update this Question",
      });
    }
  } else {
    res.status(401).send({
      message: "Unauthorized Access",
    });
  }
};

// -------------------------------------------------------------------
// * Delete a Question with the questionId
// ---------------------------------------
exports.deleteById = (req, res) => {
  const username = checkAccessToken(req.cookies.auth);
  if (username) {
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
  } else {
    res.status(401).send({
      message: "Unauthorized Access",
    });
  }
};

// -------------------------------------------------------------------
// * Retrieve all Questions
// ------------------------
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
// ------------------------------------------
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
// ---------------------------------------
exports.getByUsername = (req, res) => {
  if (checkAccessToken(req.cookies.auth)) {
    Questions.getByUsername(
      req.cookies.username,
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message:
                "Not Found Question with username " +
                req.cookies.username,
            });
          } else {
            res.status(500).send({
              message:
                "Error while Finding Question with username " +
                req.cookies.username,
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

// -------------------------------------------------------------------
// Get Question by search in title or content of question or in tags.
// -------------------------------------------------------------------
exports.getBySearch = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const search = req.params.search.toLowerCase();
  Questions.getBySearch(search, (err, data) => {
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

// -------------------------------------------------------------------
// Get Views updated on click of any question.
// --------------------------------------------------------
exports.updateViews = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Questions.updateViews(req.body.slug, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message:
            "Not Found Question with slug " + req.body.slug,
        });
      } else {
        res.status(500).send({
          message:
            "Error while Find Question with slug " +
            req.body.slug,
        });
      }
    } else {
      res.status(200).send(data);
    }
  });
};
