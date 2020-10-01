const constants = require("../utils/constants");
const db = require("../config/db");

exports.getFacts = async (request, response) => {
	const facts = [];
	try {
		const factsRef = db.collection(constants.factsCollectionName);
		const snapshot = await factsRef.orderBy("createdAt", "desc").get();
		snapshot.forEach((doc) => {
			facts.push({ id: doc.id, ...doc.data() });
		});
		return response.status(200).json({
			success: true,
			data: facts,
		});
	} catch (error) {
		console.log(error);
		response.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};

exports.createFact = async (request, response) => {
	const requestBody = request.body;
	const newFact = {
		username: request.user.username,
		question: requestBody.question,
		answer: requestBody.answer,
		createdAt: new Date().toISOString(),
	};
	const factsRef = db.collection(constants.factsCollectionName);
	try {
		const docRef = await factsRef.add(newFact);
		const doc = await docRef.get();
		return response.status(201).json({
			success: true,
			data: {
				id: doc.id,
				...doc.data(),
			},
		});
	} catch (error) {
		console.log(error);
		response.status(500).json({
			success: false,
			message: "Internal Server Error",
		});
	}
};
