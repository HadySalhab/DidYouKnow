const firebase = require("firebase");
const { isNullOrEmpty, isEmail } = require("../utils/validators");
const db = require("../config/db");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.signup = asyncHandler(async (request, response, next) => {
	const requestBody = request.body;

	if (isNullOrEmpty(requestBody.email)) {
		next(new ErrorResponse("Please provide an email", 400));
	}
	if (!isEmail(requestBody.email)) {
		next(new ErrorResponse("Please provide a valid email", 400));
	}
	if (isNullOrEmpty(requestBody.password)) {
		next(new ErrorResponse("Please provide a password", 400));
	}
	if (requestBody.password !== requestBody.confirmPassword) {
		next(new ErrorResponse("Passwords must match", 400));
	}
	if (isNullOrEmpty(requestBody.username)) {
		next(new ErrorResponse("Please provide a username", 400));
	}
	const docSnapShot = await db.doc(`/users/${requestBody.username}`).get();
	if (docSnapShot.exists) {
		next(
			new ErrorResponse(
				"This username is already in use by another account.",
				400
			)
		);
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
});

exports.login = asyncHandler(async (request, response, next) => {
	const requestBody = request.body;
	if (isNullOrEmpty(requestBody.email)) {
		next(new ErrorResponse("Please provide an email", 400));
	}
	if (!isEmail(requestBody.email)) {
		next(new ErrorResponse("Please provide a valid email", 400));
	}
	if (isNullOrEmpty(requestBody.password)) {
		next(new ErrorResponse("Please provide a password", 400));
	}
	const newAuthUser = await firebase
		.auth()
		.signInWithEmailAndPassword(requestBody.email, requestBody.password);
	const token = await newAuthUser.user.getIdToken();
	return response.status(200).json({
		success: true,
		data: token,
	});
});
