module.exports = (app) => {
  const questions = require("../controller/questions.controller");

  // Create a new Question
  app.post("/questions", questions.create);

  // Update the Question by questionId
  app.put("/questions/:questionId", questions.updateById);

  // Delete the Question by questionId
  app.delete("/questions/:questionId", questions.deleteById);

  // Retrieve all Questions
  app.get("/questions", questions.getAll);

  // Retrieve a Question by questionId
  app.get("/questions/:questionId", questions.getById);

  // Retrieve all Questions by userId
  app.get("/questions/:userId", questions.getByUserId);
};
