const sql = require("./db");

// Constructor
const Question = function (question) {
  this.questionId = question.questionId;
  this.doc = question.doc;
  this.views = 0;
  this.title = question.title;
  this.content = question.content;
  this.username = question.username;
  this.slug = question.slug;
};
// -------------------------------------------------------------------
// %Y-%m-%d %H:%i:%s
// SETTERS
// -----------------------------------
// Create new Question
Question.create = (newQuestion, result) => {
  // const query =
  //   "INSERT INTO question(doc, views, title, content, userId, slug) VALUES (TO_DATE(?,'YYYY-MM-DD hh:mm:ss'), ?, ?, ?, ?, ?)";
  // const parameters = [
  //   newQuestion.doc,
  //   newQuestion.views,
  //   newQuestion.title,
  //   newQuestion.content,
  //   newQuestion.userId,
  //   newQuestion.slug,
  // ];
  const query = "INSERT INTO question SET ?";
  sql.query(query, [newQuestion], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    //   id: res.insertId,
    //   ...newQuestion,
    // console.log("Question Created :
    //   res,
    // });
    result(null, { ...res });
  });
};

// -----------------------------------
// Update the whole Question with questionId
Question.updateById = (quesId, question, result) => {
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

  const query = "UPDATE question SET ? WHERE questionId = ?";
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
    // console.log("Updated Question : ", {
    //   id: quesId,
    //   ...question,
    // });
    result(null, { ...res });
  });
};

// -----------------------------------
// Delete Question with questionId
Question.deleteById = (quesId, result) => {
  const query = "DELETE FROM question WHERE questionId = ?";
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
    // console.log("Deleted Questions : ", { res });
    result(null, { ...res });
  });
};

// -------------------------------------------------------------------

//GETTERS
// -----------------------------------
// Get All the Questions
Question.getAll = (result) => {
  const query =
    "SELECT questionId, doc, views, title,content, slug, question.username, firstName, middleName, lastName, email, bio, batch, degree, field FROM question, user WHERE question.username = user.username";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    // console.log("Questions : ", res);
    result(null, { ...res });
  });
};

// -----------------------------------
// Get Question by questionId
Question.getById = (quesId, result) => {
  const query = "SELECT * FROM question WHERE questionId = ?";
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
    // console.log("Question : ", res);
    result(null, ...res);
  });
};

// -----------------------------------
// Get Question by userId
Question.getByUsername = (username, result) => {
  const query = "SELECT * FROM question WHERE username = ?";
  const parameters = [username];
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
    // console.log("Question : ", res);
    result(null, { ...res });
  });
};

// -----------------------------------
// Get Question by userId
Question.getBySearch = (description, result) => {
  const query =
    "SELECT questionId, doc, views, title,content, slug, question.username, firstName, middleName, lastName, email, bio, batch, degree, field FROM question, user WHERE question.username = user.username and (title like ? or content like ?)";
  description = "%" + description + "%";
  const parameters = [description, description];

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
    // console.log("Question : ", res);
    result(null, { ...res });
  });
};
// -------------------------------------------------------------------

module.exports = Question;
