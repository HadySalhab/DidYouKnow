const constants = require("../utils/constants");
const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc      Get all facts
// @route     GET /facts
// @access    Public
exports.getFacts = asyncHandler(async (request, response, next) => {
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
