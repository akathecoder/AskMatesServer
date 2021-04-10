const sql = require("./db");

// Constructor
const Question = (question) => {
  this.Question_ID = question.Question_ID;
  this.DOC = Date.now();
  this.Views = 0;
  this.Title = question.Title;
  this.Content = question.Content;
  this.User_ID = question.User_ID;
  this.slug = question.slug;
};
