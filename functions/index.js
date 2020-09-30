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
	const facts = [];
	try {
		const factsRef = admin
			.firestore()
			.collection(constants.factsCollectionName);
		const snapshot = await factsRef.get();
		snapshot.forEach((doc) => {
			facts.push(doc.data());
		});
		return response.json({
			success: true,
			data: facts,
		});
	} catch (error) {
		console.log(error);
	}
});
