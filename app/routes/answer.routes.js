module.exports = (app) => {
  const answers = require("../controller/answer.controller.js");

  // -------------------------------------------------------------------
  // POST
  // Create a new Answer
  app.post("/answers", answers.create);

  // -------------------------------------------------------------------
  // DELETE
  // Delete an existing Answer
  app.delete("/answers/:answerId", answers.delete);

  // Delete by questionId
  app.delete("/answers/", answers.deleteByQuestionId);

  // Delete by username
  app.delete("/answers/", answers.deleteByUsername);

  // -------------------------------------------------------------------
  // GET
  // Get an existing Answer by question Id
  // app.get("/answers/:questionId", answers.get);
  // Not working because it is a parameterized route, cannot use query
  //  To access parameters use req.params.[parameter_name]

  // Get an existing Answer by question Id
  app.get(
    "/answers/byquestionid/",
    answers.getByQuestionId
  );
  // To access query parameters use req.query.[query_parameter_name]

  // Get an existing Answer by username
  app.get("/answers/byusername", answers.getByUsername);

  // Get an answer with matching searchTerm
  app.get("/answers/search/:searchTerm", answers.search);

  // -------------------------------------------------------------------
  // PATCH
  // Update an existing Answer
  app.patch("/answers/:answerId", answers.update);

  // Upvote an existing Answer
  app.patch("/answers/upvote/:answerId", answers.upvote);

  // Downvote an existing Answer
  app.patch(
    "/answers/downvote/:answerId",
    answers.downvote
  );

  // Mark answer correct
  app.patch(
    "/answers/correct/:answerId",
    answers.markCorrect
  );

  // Mark answer incorrect
  app.patch(
    "/answers/incorrect/:answerId",
    answers.markIncorrect
  );
};
