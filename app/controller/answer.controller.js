const Answer = require("../models/Answer.model.js");
const User = require("../models/User.model.js");

// -------------------------------------------------------------------
// -----------------------------------
// Create a new Answer
// -----------------------------------
exports.create = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content cannot be empty!",
		});
	}
	// Create Answer using constructor
	const newAnswer = new Answer({
		...req.body,
		correct: "I",
		upVotes: 0,
		downVotes: 0,
	});
	// Save answer in the Database
	Answer.create(newAnswer, (error, answerData) => {
		if (error) {
			res.status(500).send({
				message:
					error.message ||
					"Internal error occured while creating the Answer.",
			});
		} else {
			res.status(200).send(answerData);
		}
	});
};

// -----------------------------------
// Update Answer with given Id
// -----------------------------------
exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
		res.status(400).send({
			message: "Content cannot be empty!",
		});
	}
	// Create updated answer
	const answerId = req.params.answerId;
	const updatedAnswer = req.body;
	// Save answer in the Database
	Answer.updateById(
		answerId,
		updatedAnswer,
		(error, answerData) => {
			if (error) {
				if (error.kind === "not_found") {
					res.status(404).send({
						message: `Cannot find answer with id ${answerId}`,
					});
				} else {
					res.status(500).send({
						message:
							error.message ||
							"Internal error occured while updating the Answer.",
					});
				}
			} else {
				res.status(200).send(answerData);
			}
		}
	);
};

// -----------------------------------
// Create a new Answer
// -----------------------------------
exports.delete = (req, res) => {
	const answerId = req.params.answerId;
	Answer.deleteById(answerId, (error, answerData) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Cannot find answer with id ${answerId}`,
				});
			} else {
				res.status(500).send({
					message: `Internal error occured while deleting the answer with id ${answerId}`,
				});
			}
		} else {
			res.send({
				message: `Answer with id ${answerId} deleted sucessfully.`,
				answerData,
			});
		}
	});
};

// -----------------------------------
// Get an existing Answer by question Id
// -----------------------------------
exports.get = (req, res) => {
	const questionId = req.query.questionId;
	Answer.getByQuesId(questionId, (error, answerData) => {
		if (error) {
			if (error.kind === "not_found") {
				res.status(404).send({
					message: `Cannot find answer with questionId ${questionId}`,
				});
			} else {
				res.status(500).send({
					message: `Internal error occured while fetching the answer with questionId ${questionId}`,
				});
			}
		} else {
			res.status(200).send(answerData);
		}
	});
};
// -------------------------------------------------------------------
