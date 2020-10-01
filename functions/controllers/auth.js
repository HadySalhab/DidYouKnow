const firebase = require("firebase");
const admin = require("firebase-admin");
const { isNullOrEmpty, isEmail } = require("../utils/validators");
const db = admin.firestore();

exports.signup = async (request, response) => {
	try {
		const requestBody = request.body;

		if (isNullOrEmpty(requestBody.email)) {
			return response.status(400).json({
				success: false,
				message: "Please provide an email",
			});
		}
		if (!isEmail(requestBody.email)) {
			return response.status(400).json({
				success: false,
				message: "Please provide a valid email",
			});
		}
		if (isNullOrEmpty(requestBody.password)) {
			return response.status(400).json({
				success: false,
				message: "Please provide a password",
			});
		}
		if (requestBody.password !== requestBody.confirmPassword) {
			return response.status(400).json({
				success: false,
				message: "Passwords must match",
			});
		}
		if (isNullOrEmpty(requestBody.username)) {
			return response.status(400).json({
				success: false,
				message: "Please provide a username",
			});
		}
		const docSnapShot = await db.doc(`/users/${requestBody.username}`).get();
		if (docSnapShot.exists) {
			return response.status(400).json({
				success: false,
				message: "This username is already in use by another account.",
			});
		}

		const newAuthUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(requestBody.email, requestBody.password);

		const newUser = {
			username: requestBody.username,
			email: requestBody.email,
			createdAt: new Date().toISOString(),
			authID: newAuthUser.user.uid,
		};

		// https://stackoverflow.com/questions/47474522/firestore-difference-between-set-and-add
		await db.doc(`/users/${requestBody.username}`).set(newUser);
		const token = await newAuthUser.user.getIdToken();
		return response.status(201).json({
			success: true,
			data: token,
		});
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
