const sql = require("./db");

// Constructor
const Question = function (question) {
  this.questionId = question.questionId;
  this.doc = question.doc;
  this.views = question.views;
  this.title = question.title;
  this.content = question.content;
  this.username = question.username;
  this.slug = question.slug;
  this.tags = question.tags;
};
// -------------------------------------------------------------------
// SETTERS
// -------------------
// Create new Question
// -------------------
Question.create = (newQuestion, result) => {
  const query = "INSERT INTO question SET ?";
  sql.query(query, [newQuestion], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// -----------------------------------------
// Update the whole Question with questionId
// -----------------------------------------
Question.updateById = (quesId, question, result) => {
  const query = `UPDATE question SET title=?, content=?, doc=?, slug=?, tags=? WHERE questionId = ?`;
  const parameters = [
    question.title,
    question.content,
    question.doc,
    question.slug,
    question.tags,
    quesId,
  ];
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
    result(null, res);
  });
};

// -------------------------------
// Delete Question with questionId
// -------------------------------
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
    result(null, res);
  });
};

// -------------------------------------------------------------------

//GETTERS
// ---------------------
// Get All the Questions
// ---------------------
Question.getAll = (result) => {
  const query =
    "SELECT questionId, doc, views, title,content, slug, tags, question.username, firstName, middleName, lastName, batch, degree, field FROM question, user WHERE question.username = user.username";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// --------------------------
// Get Question by questionId
// --------------------------
Question.getById = (quesId, result) => {
  const query =
    "SELECT questionId, doc, views, title,content, slug, tags, question.username, firstName, middleName, lastName, batch, degree, field FROM question, user WHERE question.username = user.username and questionId = ?";
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
    result(null, res[0]);
  });
};

// -----------------------------
// Get Question by question slug
// -----------------------------
Question.getBySlug = (slug, result) => {
  const query =
    "SELECT questionId, doc, views, title,content, slug, tags, question.username, firstName, middleName, lastName, batch, degree, field FROM question, user WHERE question.username = user.username and slug = ?";
  const parameters = [slug];
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
    result(null, res[0]);
  });
};

// ----------------------
// Get Question by userId
// ----------------------
Question.getByUsername = (username, result) => {
  const query =
    "SELECT questionId, doc, views, title,content, slug, tags, question.username, firstName, middleName, lastName, batch, degree, field FROM question, user WHERE question.username = user.username and question.username = ?";
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
    result(null, res);
  });
};

// ---------------------------------------------------
// Get Question by search filter in content and title.
// ---------------------------------------------------
Question.getBySearch = (description, result) => {
  const query =
    "SELECT questionId, doc, views, title,content, slug, tags, question.username, firstName, middleName, lastName, batch, degree, field FROM question, user WHERE question.username = user.username and (title like ? or content like ? or tags like ?)";
  description = "%" + description + "%";
  const parameters = [description, description, description];

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
    result(null, res);
  });
};

// -------------------------------------------
// Get Views updated on click of any question.
// -------------------------------------------
Question.updateViews = (slug, result) => {
  const query1 = "SELECT views FROM question WHERE slug = ?";
  const query2 = "UPDATE question SET views = ? WHERE slug = ?";

  sql.query(query1, [slug], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (!res.length) {
      result({ kind: "not_found" }, null);
      return;
    }
    const views_new = res[0].views + 1;
    sql.query(query2, [views_new, slug], (err, res) => {
      result(null, res);
    });
  });
};

// -------------------------------------------------------------------

module.exports = Question;

// ----------------------------------------------------------------------------
// Or we can directly first update views and then show the question on the click of any question by question slug.
// ----------------------------------------------------------------------------
// Get Questions with updated Views as well by question slug.
// ----------------------------------------------------------
// Question.getBySlug = (slug, result) => {
//   const query1 = "SELECT views FROM question WHERE slug = ?";
//   const query2 = "UPDATE question SET views = ? WHERE slug = ?";
//   const query3 = "SELECT * FROM question WHERE slug = ?";

//   sql.query(query1, [slug], (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }
//     if (!res.length) {
//       result({ kind: "not_found" }, null);
//       return;
//     }
//     console.log("viewsss : ", res);
//     const views_new = res[0].views + 1;
//     sql.query(query2, [views_new, slug], (err, res) => {});
//     sql.query(query3, [slug], (err, res) => {
//       result(null, ...res);
//     });
//   });
// };
