const ErrorResponse = require("../utils/ErrorResponse");

module.exports = (error, request, response, next) => {
	let errorResponse;
	console.log(error);
	if (error instanceof ErrorResponse) {
		errorResponse = error;
	} else {
		errorResponse = getErrorResponse(error);
	}
	return response.status(errorResponse.statusCode).json({
		success: false,
		message: errorResponse.message,
	});
};

//https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createuserwithemailandpassword
//https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
function getErrorResponse(error) {
	if (error.code) {
		if (error.code.startsWith("auth/")) {
			if (
				error.code === "auth/email-already-in-use" ||
				error.code === "auth/invalid-email" ||
				error.code === "auth/operation-not-allowed" ||
				error.code === "auth/weak-password" ||
				error.code === "auth/wrong-password"
			) {
				return new ErrorResponse(error.message, 400);
			}
			if (error.code === "auth/user-not-found") {
				return new ErrorResponse(error.message, 404);
			}
			if (
				error.code === "auth/id-token-expired" ||
				error.code === "auth/invalid-id-token" ||
				error.code === "auth/invalid-uid"
			) {
				return new ErrorResponse(error.message, 401);
			}
			if (error.code === "auth/internal-error") {
				return new ErrorResponse(error.message, 500);
			}
		}
		// https://firebase.google.com/docs/reference/js/firebase.firestore#firestoreerrorcode
		if (error.code === "already-exists" || error.code === "invalid-argument") {
			return new ErrorResponse(error.message, 400);
		}
		if (error.code === "not-found") {
			return new ErrorResponse(error.message, 404);
		}
	}
	return new ErrorResponse("Internal Server Error", 500);
}
