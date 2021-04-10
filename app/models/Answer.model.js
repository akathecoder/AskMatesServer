const sql = require("./db");

// Constructor
const Answer = (answer) => {
  this.Answer_ID = answer.Answer_ID;
  this.Answer_Body = answer.Answer_Body;
  this.Correct = answer.Correct;
  this.Upvotes = answer.Upvotes;
  this.Downvotes = answer.Downvotes;
  this.Question_ID = answer.Question_ID;
  this.DOC = answer.DOC;
  this.User_ID = answer.User_ID;
};
