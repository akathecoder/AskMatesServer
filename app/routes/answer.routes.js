module.exports = app => {
	const answers = require("../controller/answer.controller.js");

	// Create a new Answer
	app.post("/answers", answers.create);

	// Update an existing Answer
	app.patch("/answers/:answerId", answers.update);

	// Delete an existing Answer
	app.delete("/answers/:answerId", answers.delete);

	// Get an existing Answer by question Id
	// app.get("/answers/:questionId", answers.get);
	// Not working because it is a parameterized route, cannot use query
	//  To access parameters use req.params.[parameter_name]

	// Get an existing Answer by question Id
	app.get("/answers", answers.get);
	// To access query parameters use req.query.[query_parameter_name]
};
