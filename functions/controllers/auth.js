const firebase = require("firebase");
const admin = require("firebase-admin");

const db = admin.firestore();

exports.signup = async (request, response) => {
	try {
		const requestBody = request.body;
		const docSnapShot = await db.doc(`/users/${requestBody.username}`).get();
		if (docSnapShot.exists) {
			return response.status(400).json({
				success: false,
				message: "This username is already in use by another account.",
			});
		} else {
			const userCredential = await firebase
				.auth()
				.createUserWithEmailAndPassword(
					requestBody.email,
					requestBody.password
				);
			const token = await userCredential.user.getIdToken();
			const newUser = {
				username: requestBody.username,
				email: requestBody.email,
				createdAt: new Date().toISOString(),
				authID: userCredential.user.uid,
			};
			// https://stackoverflow.com/questions/47474522/firestore-difference-between-set-and-add
			await db.doc(`/users/${requestBody.username}`).set(newUser);
			return response.status(201).json({
				success: true,
				data: token,
			});
		}
	} catch (error) {
		console.log(error);
		if (error.code === "auth/email-already-in-use") {
			return response.status(400).json({
				success: false,
				message: "The email address is already in use by another account.",
			});
		} else {
			return response.status(500).json({
				success: false,
				message: "Internal Server Error",
			});
		}
	}
};
