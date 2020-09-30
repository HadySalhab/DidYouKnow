const functions = require("firebase-functions");
const constants = require("../utils/constants");
const admin = require("firebase-admin");

exports.getFacts = async (request, response) => {
	const facts = [];
	try {
		const factsRef = admin
			.firestore()
			.collection(constants.factsCollectionName);
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
		owner: requestBody.owner,
		question: requestBody.question,
		answer: requestBody.answer,
		createdAt: admin.firestore.Timestamp.fromDate(new Date()),
	};
	const factsRef = admin.firestore().collection(constants.factsCollectionName);
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
