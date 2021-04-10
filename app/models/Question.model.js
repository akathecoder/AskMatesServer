const sql = require("./db");

// Constructor
const Question = function (question) {
  this.questionId = question.questionId;
  this.doc = Date.now();
  this.views = 0;
  this.title = question.title;
  this.content = question.content;
  this.userId = question.userId;
  this.slug = question.slug;
};
// -------------------------------------------------------------------

// SETTERS
// -----------------------------------
// Create new Question
Question.create = (newQuestion, result) => {
  // const query =
  //   "INSERT INTO question(doc, views, title, content, userId, slug) VALUES (?, ?, ?, ?, ?, ?)";
  // const parameters = [
  //   newQuestion.doc,
  //   newQuestion.views,
  //   newQuestion.title,
  //   newQuestion.content,
  //   newQuestion.userId,
  //   newQuestion.slug,
  // ];
  const query = "INSERT INTO question SET ?";
  sql.query(query, question, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    console.log("Question Created : ", {
      id: res.insertId,
      ...question,
    });
    result(null, { id: res.insertId });
  });
};

// -----------------------------------
// Update the whole Question with questionId
Question.updateByID = (quesId, question, result) => {
  // const query =
  //   "UPDATE Question SET doc = ? , views = ? , title = ? , content = ? , userId = ?, slug = ? WHERE questionId = ?";
  // const parameters = [
  //   question.doc,
  //   questionews,
  //   questiontle,
  //   question.content,
  //   question.userId,
  //   question.slug,
  //   quesId,
  // ];
  const query = "UPDATE Question SET ? WHERE questionId = ?";
  const parameters = [question, quesId];
  sql.query(query, parameters, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Updated Question : ", {
      id: quesId,
      ...question,
    });
    result(null, { id: quesId });
  });
};

// -----------------------------------
// Delete Question with questionId
Question.deleteByID = (quesId, result) => {
  const query = "DELETE FROM Question WHERE questionId = ?";
  const parameters = [quesId];
  sql.query(query, parameters, (err, res) => {
    if (err) {
      console.log("Error : ", err);
      result(err, null);
      return;
    }
    if (res.affectedRows === 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Deleted Questions : ", { id: quesid, res });
    result(null, { id: quesid });
  });
};

// -------------------------------------------------------------------

//GETTERS
// -----------------------------------
// Get All the Questions
Question.getAll = (result) => {
  const query = "SELECT * FROM Question";
  sql.query(query, (err, relse) => {
    // ! check for fields baad me dekhna h ise
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("Questions : ", res);
    result(null, res);
  });
};

// -----------------------------------
// Get Question by questionId
Question.getByID = (quesId, result) => {
  const query = "SELECT * FROM Question WHERE questionId = ?";
  const parameters = [quesId];
  sql.query(query, parameters, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (!res.length) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Question : ", res);
    result(null, res);
  });
};

// -----------------------------------
// Get Question by userId
Question.getByUserId = (userId, result) => {
  const query = "SELECT * FROM Question WHERE userId = ?";
  const parameters = [userId];
  sql.query(query, parameters, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (!res.length) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("Question : ", res);
    result(null, res);
  });
};
// -------------------------------------------------------------------
