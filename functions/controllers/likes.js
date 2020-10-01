const asyncHandler = require("../middlewares/asyncHandler");
const db = require("../config/db");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc      Add Like to a fact
// @route     GET /facts/:factId/like
// @access    Private
module.exports.addLike = asyncHandler(async (request, response, next) => {
	const factDocSnapshot = await db.doc(`/facts/${request.params.factId}`).get();
	if (factDocSnapshot.exists) {
	} else {
		return next(new ErrorResponse("Resource not found", 404));
	}
	const likeDocQuerySnapshot = await db
		.collection("likes")
		.where("username", "==", request.user.username)
		.where("fact", "==", request.params.factId)
		.limit(1)
		.get();
	if (likeDocQuerySnapshot.empty) {
		await db.collection("likes").add({
			fact: request.params.factId,
			username: request.user.username,
		});
		const updatedFact = {
			...factDocSnapshot.data(),
			likeCount: factDocSnapshot.data().likeCount + 1,
		};
		await db.doc(`/facts/${request.params.factId}`).update(updatedFact);
		return response.status(200).json({
			success: true,
			data: {
				id: factDocSnapshot.id,
				...updatedFact,
			},
		});
	} else {
		next(new ErrorResponse("Facts already liked", 400));
	}
});

// @desc      Remove Like from a fact
// @route     GET /facts/:factId/unlike
// @access    Private
module.exports.removeLike = asyncHandler(async (request, response, next) => {
	const factDocSnapshot = await db.doc(`/facts/${request.params.factId}`).get();
	if (factDocSnapshot.exists) {
	} else {
		return next(new ErrorResponse("Resource not found", 404));
	}
	const likeDocQuerySnapshot = await db
		.collection("likes")
		.where("username", "==", request.user.username)
		.where("fact", "==", request.params.factId)
		.limit(1)
		.get();
	if (likeDocQuerySnapshot.empty) {
		return next(new ErrorResponse("Facts already unliked", 400));
	} else {
		await db.doc(`/likes/${likeDocQuerySnapshot.docs[0].id}`).delete();
		const updatedFact = {
			...factDocSnapshot.data(),
			likeCount: factDocSnapshot.data().likeCount - 1,
		};
		await db.doc(`/facts/${request.params.factId}`).update(updatedFact);
		return response.status(200).json({
			success: true,
			data: {
				id: factDocSnapshot.id,
				...updatedFact,
			},
		});
	}
});
