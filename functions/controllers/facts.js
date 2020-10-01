const constants = require("../utils/constants");
const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

// @desc      Get all facts
// @route     GET /facts
// @access    Public
exports.getAllFacts = asyncHandler(async (request, response, next) => {
	const facts = [];

	const factsRef = db.collection(constants.factsCollectionName);
	const snapshot = await factsRef.orderBy("createdAt", "desc").get();
	snapshot.forEach((doc) => {
		facts.push({ id: doc.id, ...doc.data() });
	});
	return response.status(200).json({
		success: true,
		data: facts,
	});
});

// @desc      Create a fact
// @route     POST /facts
// @access    Private
exports.createFact = asyncHandler(async (request, response, next) => {
	const requestBody = request.body;
	const newFact = {
		username: request.user.username,
		question: requestBody.question,
		answer: requestBody.answer,
		createdAt: new Date().toISOString(),
	};
	const factsRef = db.collection(constants.factsCollectionName);
	const docRef = await factsRef.add(newFact);
	const doc = await docRef.get();
	return response.status(201).json({
		success: true,
		data: {
			id: doc.id,
			...doc.data(),
		},
	});
});

// @desc      Get a single fact
// @route     GET /facts/:factId
// @access    Private
exports.getFact = asyncHandler(async (request, response, next) => {
	const factDocSnapshot = await db.doc(`/facts/${request.params.factId}`).get();
	if (!factDocSnapshot.exists) {
		next(new ErrorResponse("Resource not found", 404));
	}
	const commentDocSnapshot = await db
		.collection("comments")
		.orderBy("createdAt", "desc")
		.where("fact", "==", request.params.factId)
		.get();
	let comments = [];
	commentDocSnapshot.forEach((commentDoc) => {
		comments.push({
			id: commentDoc.id,
			...commentDoc.data(),
		});
	});
	return response.status(200).json({
		success: true,
		data: {
			id: factDocSnapshot.id,
			...factDocSnapshot.data(),
			comments,
		},
	});
});
