const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const { isNullOrEmpty } = require("../utils/validators");

// @desc      Add comment to a fact
// @route     POST /facts/:factId/comments
// @access    Private
module.exports.addComment = asyncHandler(async (request, response, next) => {
	const requestBody = request.body;
	if (isNullOrEmpty(requestBody.body.trim())) {
		next(new ErrorResponse("Comment body cannot be empty", 400));
	}
	const newComment = {
		username: request.user.username,
		fact: request.params.factId,
		body: requestBody.body,
		createdAt: new Date().toISOString(),
	};
	const factDocSnapshot = await db.doc(`/facts/${request.params.factId}`).get();
	if (!factDocSnapshot.exists) {
		next(new ErrorResponse("Fact not found", 404));
	}
	const commentDocReference = await db.collection("comments").add(newComment);
	const commentDoc = await commentDocReference.get();
	return response.status(201).json({
		success: true,
		data: {
			id: commentDoc.id,
			...commentDoc.data(),
			username: request.user, //populating the user
		},
	});
});
