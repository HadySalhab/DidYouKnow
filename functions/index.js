const functions = require("firebase-functions");
const admin = require("firebase-admin");

const constants = require("./constants");

// default app is set in .firebaserc file
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
	functions.logger.info("Hello logs!", { structuredData: true });
	response.send("Hello from Firebase!");
});

exports.getFacts = functions.https.onRequest(async (request, response) => {
	const method = request.method;
	if (method !== "GET") {
		return response.status(400).json({
			success: false,
			message: "Please send a GET request on this route",
		});
	}
	const facts = [];
	try {
		const factsRef = admin
			.firestore()
			.collection(constants.factsCollectionName);
		const snapshot = await factsRef.get();
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
});

exports.createFact = functions.https.onRequest(async (request, response) => {
	const method = request.method;
	if (method !== "POST") {
		return response.status(400).json({
			success: false,
			message: "Please send a POST request on this route",
		});
	}
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
});
