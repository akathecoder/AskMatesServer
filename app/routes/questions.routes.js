module.exports = (app) => {
  const questions = require("../controller/questions.controller.js");

  // Create a new Question
  app.post("/question", questions.create);

  // Update the Question by questionId
  app.patch("/question/:questionId", questions.updateById);

  // Delete the Question by questionId
  app.delete("/question/:questionId", questions.deleteById);

  // Retrieve all Questions
  app.get("/questions", questions.getAll);

  // Retrieve a Question by questionId or Question Slug
  app.get("/question", questions.getById);

  // Update the views of question on click of any question by Question slug
  app.patch("/question", questions.updateViews);

  // Retrieve a Question using filter in content or question description.
  app.get("/questions/question/:search", questions.getBySearch);

  // Retrieve all Questions by userId
  app.get("/questions/username/:username", questions.getByUsername);
};
