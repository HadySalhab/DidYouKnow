const admin = require("firebase-admin");
const db = require("../config/db");

// Middleware to protect route if token is not available
exports.protect = async (request, response, next) => {
	try {
		let token;
		if (
			request.headers.authorization &&
			request.headers.authorization.startsWith("Bearer")
		) {
			token = request.headers.authorization.split(" ")[1];
		}
		if (!token) {
			return response.status(401).json({
				success: false,
				message: "Not authorized, please login again",
			});
		}
		const decodedToken = await admin.auth().verifyIdToken(token);
		const authId = decodedToken.uid;
		await admin.auth().getUser(authId); //to check if user exists
		const userRef = await db
			.collection("users")
			.where("authId", "==", authId)
			.limit(1)
			.get();
		const user = userRef.docs[0].data();
		request.user = user;
		return next();
	} catch (error) {
		console.log(error);
		if (error.code && error.code.startsWith("auth/")) {
			return response.status(401).json({
				success: false,
				message: error.message,
			});
		} else {
			return response.status(500).json({
				success: false,
				message: "Internal Server Error",
			});
		}
	}
};
