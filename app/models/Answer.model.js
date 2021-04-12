const sql = require("./db.js");

// Constructor
const Answer = function (answer) {
  this.answerBody = answer.answerBody;
  this.correct = answer.correct;
  this.upVotes = answer.upVotes;
  this.downVotes = answer.downVotes;
  this.questionId = answer.questionId;
  this.doc = answer.doc;
  this.username = answer.username;
};

// -------------------------------------------------------------------

// --------------SETTERS--------------
// -----------------------------------
// Create a new Answer
// -----------------------------------
Answer.create = (newAnswer, cb) => {
  const query = `INSERT INTO answer SET ?`;
  sql.query(query, [newAnswer], (error, result) => {
    if (error) {
      console.log("ERROR: ", error);
      cb(error, null);
      return;
    }

    cb(null, result);
  });
};

// -----------------------------------
// Update Answer with answerId
// -----------------------------------
Answer.updateById = (answerId, { answerBody, doc }, cb) => {
  const query = `UPDATE answer SET answerBody=?, doc=? WHERE answerId = ?`;
  sql.query(
    query,
    [answerBody, doc, answerId],
    (error, result) => {
      if (error) {
        console.log("ERROR: ", error);
        cb(error, null);
        return;
      }
      if (result.affectedRows === 0) {
        // if not found any
        cb({ kind: "not_found" }, null);
        return;
      }
      cb(null, result);
    }
  );
};

// -----------------------------------
// Delete Answer with answerId
// -----------------------------------
Answer.deleteById = (answerId, cb) => {
  const query = "DELETE FROM answer WHERE answerId = ?";
  sql.query(query, [answerId], (error, result) => {
    if (error) {
      console.log("Error : ", error);
      cb(null, error);
      return;
    }

    if (result.affectedRows === 0) {
      // if not found any
      cb({ kind: "not_found" }, null);
      return;
    }
    cb(null, result);
  });
};

// --------------GETTERS--------------
// -----------------------------------
// Get all Answers by questionId
// -----------------------------------
Answer.getByQuesId = (questionId, cb) => {
  const query =
    "SELECT answerId, answerBody, correct, upVotes, downVotes, questionId, answer.doc, answer.username, firstName, middleName, lastName, email, bio, batch, degree, field FROM answer, user WHERE answer.username=user.username AND answer.questionId = ?";
  sql.query(query, [questionId], (error, result) => {
    if (error) {
      console.log("Error : ", error);
      cb(null, error);
      return;
    }
    if (result.affectedRows === 0) {
      // if not found any
      cb({ kind: "not_found" }, null);
    }
    cb(null, result);
  });
};

// -------------------------------------------------------------------

module.exports = Answer;
